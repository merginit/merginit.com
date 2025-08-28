import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { promises as fs } from 'fs';

puppeteer.use(StealthPlugin());

class LinkValidator {
	constructor(options = {}) {
		this.timeout = options.timeout || 20000;
		this.maxConcurrency = options.maxConcurrency || 2;
		this.retryCount = options.retryCount || 2;
		this.userAgent =
			options.userAgent ||
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
	}

	async validateLinks(urls) {
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
		});

		const results = [];
		const chunks = this.chunkArray(urls, this.maxConcurrency);

		try {
			for (const chunk of chunks) {
				const promises = chunk.map((url) => this.validateSingleLink(browser, url));
				const chunkResults = await Promise.allSettled(promises);
				results.push(
					...chunkResults.map((result, index) => ({
						url: chunk[index],
						...result
					}))
				);
			}
		} finally {
			await browser.close();
		}

		return results;
	}

	async validateSingleLink(browser, url) {
		let attempts = 0;
		while (attempts < this.retryCount) {
			let page;
			let startTime = Date.now();
			try {
				page = await browser.newPage();
				await page.setUserAgent(this.userAgent);
				page.setDefaultTimeout(this.timeout);
				await page.setViewport({ width: 1280, height: 720 });

				console.log(`Checking: ${url} (Attempt ${attempts + 1})`);

				const response = await page.goto(url, {
					waitUntil: 'networkidle2',
					timeout: this.timeout
				});

				const endTime = Date.now();
				const responseTime = endTime - startTime;

				const status = response.status();
				const finalUrl = response.url();
				const headers = response.headers();
				const contentType = headers['content-type'] || '';

				console.log(
					`URL: ${url}, Status: ${status}, Content-Type: ${contentType}, Response Time: ${responseTime}ms`
				);

				if (status >= 400) {
					return {
						status: 'error',
						httpStatus: status,
						finalUrl,
						error: `HTTP ${status}`,
						isValid: false,
						responseTime
					};
				}

				// Only perform content checks on HTML pages.
				// For PDFs, images, JS, etc., a 200 status is enough to be considered valid.
				if (!contentType.includes('text/html')) {
					return {
						status: 'success',
						httpStatus: status,
						finalUrl,
						title: 'Non-HTML Content',
						hasErrorContent: false,
						wasRedirected: finalUrl !== url,
						redirectCount: finalUrl !== url ? 1 : 0,
						isValid: true,
						responseTime
					};
				}

				// If it is an HTML page, proceed with content validation.
				await page.waitForFunction(
					'document.querySelector("body") && document.querySelector("body").innerText.length > 0',
					{ timeout: 10000 }
				);

				const pageText = await page.evaluate(() => {
					return document.body ? document.body.innerText.toLowerCase() : '';
				});

				const title = await page.title();
				const titleLower = title.toLowerCase();

				const errorPatterns = [
					'page not found',
					'file not found',
					'page cannot be found',
					'the requested url was not found',
					'site not found',
					'domain not found',
					'404 not found',
					'internal server error',
					'500 internal server error',
					'503 service unavailable',
					'502 bad gateway'
				];

				const hasErrorContent = errorPatterns.some(
					(pattern) => pageText.includes(pattern) || titleLower.includes(pattern)
				);

				const wasRedirected = finalUrl !== url;
				const redirectCount = wasRedirected ? 1 : 0;

				return {
					status: 'success',
					httpStatus: status,
					finalUrl,
					title: title.substring(0, 100),
					hasErrorContent,
					wasRedirected,
					redirectCount,
					isValid: !hasErrorContent && status < 400,
					responseTime
				};
			} catch (error) {
				const responseTime = Date.now() - startTime;
				console.log(`URL: ${url}, Error: ${error.message}, Response Time: ${responseTime}ms`);
				attempts++;
				if (attempts >= this.retryCount) {
					return {
						status: 'error',
						error: error.message,
						isValid: false,
						responseTime
					};
				}
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} finally {
				if (page) {
					await page.close();
				}
			}
		}
	}

	chunkArray(array, size) {
		const chunks = [];
		for (let i = 0; i < array.length; i += size) {
			chunks.push(array.slice(i, i + size));
		}
		return chunks;
	}

	async saveResults(results, outputFile) {
		const report = {
			timestamp: new Date().toISOString(),
			summary: {
				total: results.length,
				valid: results.filter((r) => r.value?.isValid).length,
				invalid: results.filter((r) => !r.value?.isValid).length,
				errors: results.filter((r) => r.status === 'rejected' || r.value?.status === 'error').length
			},
			results: results.map((r) => ({
				url: r.url,
				status: r.value?.status || r.status,
				...r.value
			}))
		};

		await fs.writeFile(outputFile, JSON.stringify(report, null, 2));
		console.log(`Results saved to: ${outputFile}`);
		return report;
	}
}

async function main() {
	const args = process.argv.slice(2);

	const urlsFile = args[0] || 'validation-output.log';
	const outputFile = args[1] || 'link-validation-results.json';

	try {
		const content = await fs.readFile(urlsFile, 'utf8');

		const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
		const urls = content.match(urlRegex) || [];

		if (urls.length === 0) {
			console.error('No valid URLs found in file');
			process.exit(1);
		}

		console.log(`Found ${urls.length} URLs to validate`);

		const validator = new LinkValidator({
			timeout: 15000,
			maxConcurrency: 3,
			retryCount: 1
		});

		const results = await validator.validateLinks(urls);
		const report = await validator.saveResults(results, outputFile);

		console.log('\n=== VALIDATION SUMMARY ===');
		console.log(`Total URLs: ${report.summary.total}`);
		console.log(`Valid: ${report.summary.valid}`);
		console.log(`Invalid: ${report.summary.invalid}`);
		console.log(`Errors: ${report.summary.errors}`);

		const invalidLinks = report.results.filter((r) => !r.isValid);
		if (invalidLinks.length > 0) {
			console.log('\n=== INVALID LINKS ===');
			invalidLinks.forEach((link) => {
				console.log(`❌ ${link.url}`);
				if (link.httpStatus) {
					console.log(`   HTTP ${link.httpStatus}`);
				}
				if (link.error) {
					console.log(`   Error: ${link.error}`);
				}
				if (link.hasErrorContent) {
					console.log(`   Contains error content (False Positive?)`);
				}
				if (link.responseTime) {
					console.log(`   Response Time: ${link.responseTime}ms`);
				}
				console.log('');
			});
		}
	} catch (error) {
		console.error('Error:', error.message);
		process.exit(1);
	}
}

main().catch(console.error);
