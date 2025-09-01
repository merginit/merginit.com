---
title: 'Best HTTP Security Headers Checker Tools (Open Source, 2025)'
description: 'Compare the best HTTP security headers checker tools of 2025. See open-source options like humble, shcheck, hsecscan, testssl.sh, and DrHEADer, REST API readiness, checks, outputs, and integration tips.'
date: '2025-08-18'
categories:
  - cybersecurity
  - open-source
  - comparison
  - developer-tools
published: true
author: 'Jonas Fröller'
readingTime: '15 min'
tags:
  [
    'http-security-headers',
    'OWASP',
    'CSP',
    'HSTS',
    'security-headers',
    'humble',
    'shcheck',
    'hsecscan',
    'testssl.sh',
    'DrHEADer',
    'REST-API',
    'open-source',
    'comparison',
    'DevSecOps'
  ]
---

# Comprehensive Comparison of Open-Source HTTP Security Header Checker Tools

HTTP security headers, such as Content-Security-Policy (CSP), X-Frame-Options, and Strict-Transport-Security (HSTS), are critical for protecting websites against vulnerabilities like cross-site scripting (XSS), clickjacking, and man-in-the-middle attacks. Open-source tools provide a cost-effective way to analyze these headers, ensuring compliance with security best practices, such as those recommended by the [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/). This report compares five prominent open-source tools—**humble**, **shcheck**, **hsecscan**, **testssl.sh**, and **DrHEADer**—based on licensing, supported checks, output formats, integration options (including REST API support), ease of setup, community support, and additional factors like performance and extensibility.

## Tool Comparison

Below is a detailed comparison of the five tools, addressing the key criteria: licensing, REST API support, commercial usability, security header checks, output formats, integration options, ease of setup, community activity, documentation quality, and performance, scalability, and extensibility considerations.

### 1. humble

- **Overview**: A fast, security-oriented HTTP headers analyzer available on GitHub ([rfc-st/humble](https://github.com/rfc-st/humble)). It is designed to be strict in checking headers and their values, aligning with OWASP best practices.
- **Licensing**: Licensed under the MIT License, which is permissive and allows free use in commercial projects without requiring source code distribution.
- **Provides REST API**: No. The tool is CLI-based but can be wrapped into a REST API using Python frameworks like Flask or FastAPI by invoking its functions programmatically.
- **Commercially Usable for Free**: Yes, under the MIT license, allowing unrestricted commercial use without fees.
- **Supported Security Header Checks**:
  - Covers over 60 security-related HTTP response headers.
  - Includes 15 checks for missing essential headers, 1235 checks for fingerprinting, 154 checks for deprecated or insecure values, and 28 checks for Content Security Policy (CSP) Level 3 ([W3C CSP3](https://www.w3.org/TR/CSP3/)).
  - Ensures compliance with OWASP Secure Headers Project recommendations ([OWASP Secure Headers](https://owasp.org/www-project-secure-headers/#div-bestpractices)).
  - Supports experimental headers and provides guidelines for enabling headers on popular frameworks.
- **Output Formats**: Supports CSV, HTML5, JSON, PDF 1.4, TXT, and XML, offering flexibility for reporting and integration.
- **Integration Options**:
  - Command-line interface (CLI) tool with support for proxies and raw response files (e.g., using `curl --dump-header`).
  - Integrates with **testssl.sh** for SSL/TLS checks.
  - Suitable for automated workflows, such as CI/CD pipelines.
- **Ease of Setup**:
  - Requires Python 3.11+.
  - Installation options include source code (`git clone https://github.com/rfc-st/humble.git`, `pip3 install -r requirements.txt`), Docker (`docker build -t humble:1.51 .`), or Kali Linux (`apt install humble`).
  - Minimal dependencies ensure straightforward setup.
- **Community Activity and Maintenance**:
  - Actively maintained with regular updates (see [commit history](https://github.com/rfc-st/humble/commits/master)).
  - Contributions are encouraged, with a dedicated section for contributors.
- **Documentation Quality**:
  - Comprehensive documentation, including usage details, advanced Linux usage, and lists of checks for enabled, missing, fingerprint, and insecure headers.
  - Provides guidelines for enabling headers on platforms like AWS, Angular, Apache, and Nginx.
- **Performance, Scalability, and Extensibility**:
  - Efficient for single-site analysis due to its Python-based implementation.
  - Scalable through Docker for containerized environments.
  - Extensible via code modifications and the ability to exclude specific headers from analysis.

### 2. shcheck

- **Overview**: A simple tool for checking security headers on websites, available on GitHub ([santoru/shcheck](https://github.com/santoru/shcheck)). It focuses on basic header analysis and reporting.
- **Licensing**: Licensed under GNU General Public License (GPL) v3.0, allowing commercial use but requiring source code distribution if the tool is distributed.
- **Provides REST API**: No. It's a CLI tool but can be wrapped into a REST API by invoking the script from a server process using Python.
- **Commercially Usable for Free**: Yes, under GPL-3.0, allowing commercial use without fees, though distribution requires source code sharing.
- **Supported Security Header Checks**:
  - Checks standard security headers, including Content-Security-Policy, X-XSS-Protection, Strict-Transport-Security, X-Frame-Options, Public-Key-Pins, and X-Content-Type-Options.
  - Reports on enabled and disabled headers, with options to display information, caching, and deprecated headers.
- **Output Formats**: JSON (via `-j` or `--json-output`) and text, suitable for basic reporting needs.
- **Integration Options**:
  - CLI tool, installable via PyPI (`pip3 install shcheck`), Docker, or source (`git clone https://github.com/santoru/shcheck`).
  - Supports custom ports, cookies, additional headers, and proxy settings.
- **Ease of Setup**:
  - Requires Python 3.
  - Simple installation via `pip3 install shcheck` or cloning the repository.
  - Can be run as a standalone script by copying `shcheck.py`.
- **Community Activity and Maintenance**:
  - Moderate activity, with the latest release on November 19, 2022, and open issues indicating some ongoing maintenance ([releases](https://github.com/santoru/shcheck/releases)).
  - Open for contributions, with the author welcoming improvements.
- **Documentation Quality**:
  - Basic documentation in the README, detailing usage and command-line options.
  - Lacks extensive guides or external resources compared to other tools.
- **Performance, Scalability, and Extensibility**:
  - Lightweight design suitable for small-scale checks.
  - Scalable via Docker for containerized environments.
  - Extensible by adding custom headers through code modifications.

### 3. hsecscan

- **Overview**: A security scanner for HTTP response headers, available on GitHub ([riramar/hsecscan](https://github.com/riramar/hsecscan)). It provides detailed header analysis with recommendations.
- **Licensing**: Licensed under GPL-2.0, allowing commercial use with source code distribution requirements if distributed.
- **Provides REST API**: No. It's a CLI tool but can be adapted for REST API use by invoking it from a server process, though its Python 2.x dependency complicates integration.
- **Commercially Usable for Free**: Yes, under GPL-2.0, allowing commercial use without fees, with distribution conditions.
- **Supported Security Header Checks**:
  - Analyzes security headers like CSP, HSTS, and X-Content-Type-Options, providing descriptions and security recommendations.
  - Includes options to print the entire response headers database or details for specific headers.
- **Output Formats**: Text-based output, displaying URL, status code, headers, and detailed security information.
- **Integration Options**:
  - CLI tool with support for proxies, custom user-agents, and POST data.
  - Uses a database file (`hsecscan.db`) for header checks, which can be customized.
- **Ease of Setup**:
  - Requires Python 2.x, which is outdated (end-of-life in 2020), potentially causing compatibility issues.
  - Install via `pip install hsecscan`.
  - Depends on modules like `sqlite3`, `urllib2`, and `ssl`.
- **Community Activity and Maintenance**:
  - Limited information on recent activity, suggesting low maintenance.
  - Developed by Ricardo Iramar, but no clear community contribution details.
- **Documentation Quality**:
  - Provides usage examples and command-line arguments in the README.
  - References security standards (e.g., RFCs, OWASP) for header details.
- **Performance, Scalability, and Extensibility**:
  - Scalability limited by Python 2.x dependency.
  - Extensible through database updates.

### 4. testssl.sh

- **Overview**: Primarily a tool for testing SSL/TLS configurations, available on GitHub ([drwetter/testssl.sh](https://github.com/drwetter/testssl.sh)), but includes options for checking security headers.
- **Licensing**: Licensed under GPL-2.0, allowing commercial use with source code distribution requirements if distributed.
- **Provides REST API**: No. It's a CLI tool but can be wrapped into a REST API by calling the script from a server process.
- **Commercially Usable for Free**: Yes, under GPL-2.0, allowing commercial use without fees, with distribution conditions.
- **Supported Security Header Checks**:
  - Checks headers like HSTS, HPKP, server/app banners, cookies, and others via the `-h, --header, --headers` option.
  - Less comprehensive for headers compared to dedicated tools like **humble**.
- **Output Formats**: CSV, two JSON formats, and HTML, suitable for various reporting needs.
- **Integration Options**:
  - CLI tool with extensive options, including Docker, GitHub Actions, and Nagios/Icinga plugins.
  - Supports mass scanning and parallel scans for scalability.
- **Ease of Setup**:
  - No installation required; works out of the box on Linux, macOS, FreeBSD, and other systems.
  - Clone via `git clone --depth 1 https://github.com/drwetter/testssl.sh.git --branch 3.3dev`.
  - Docker option available for containerized environments.
- **Community Activity and Maintenance**:
  - Highly active, with frequent updates and a robust issue tracker ([issues](https://github.com/drwetter/testssl.sh/issues)).
  - Contributions encouraged with clear guidelines ([CONTRIBUTING.md](https://github.com/drwetter/testssl.sh/blob/3.2/CONTRIBUTING.md)).
- **Documentation Quality**:
  - Extensive documentation, including a man page, HTML, and Markdown formats in the `~/doc/` directory.
  - Additional resources at [testssl.sh](https://testssl.sh/).
- **Performance, Scalability, and Extensibility**:
  - Designed for mass testing with parallel scan capabilities.
  - Highly extensible with configurable options and plugins.

### 5. DrHEADer

- **Overview**: A Python tool for auditing security headers, developed by Santander UK Security Engineering, available on GitHub ([Santandersecurityresearch/DrHeader](https://github.com/Santandersecurityresearch/DrHeader)).
- **Licensing**: MIT License, permissive for commercial use.
- **Provides REST API**: No, but an API is planned in the roadmap to allow scalable URL and endpoint analysis.
- **Commercially Usable for Free**: Yes, under the MIT license, allowing unrestricted commercial use without fees.
- **Supported Security Header Checks**:
  - Audits security headers for single or multiple requests.
  - Supports cross-origin isolation headers (Cross-Origin-Embedder-Policy, Cross-Origin-Opener-Policy) with opt-in validation.
  - Aligns with OWASP Application Security Verification Standard (ASVS) 4.0.
- **Output Formats**: Likely text or JSON (not explicitly specified).
- **Integration Options**:
  - Usable as a Python library (`from drheader import Drheader`) or CLI tool.
  - Supports customization of HTTP requests (method, headers, verify).
  - Planned integration with MiTM proxies.
- **Ease of Setup**:
  - Requires Python 3.8+.
  - Install via `pip install drheader`.
- **Community Activity and Maintenance**:
  - Developed by Santander UK Security Engineering team, but limited community details.
  - Maintenance status unclear beyond initial development.
- **Documentation Quality**:
  - CLI usage details available ([CLI.md](https://github.com/Santandersecurityresearch/DrHeader/blob/develop/CLI.md)).
  - Rules customization documented in [RULES.md](https://github.com/Santandersecurityresearch/DrHeader/blob/develop/RULES.md).
- **Performance, Scalability, and Extensibility**:
  - Scalable for CI/CD pipelines.
  - Extensible via customizable YAML rules.

## Comparison Table

| **Tool**       | **License** | **Provides REST API** | **Commercially Usable for Free** | **Checks**                            | **Output Formats**             | **Integration**             | **Setup**                  | **Community**                    | **Documentation**         | **Performance/Scalability**  |
| -------------- | ----------- | --------------------- | -------------------------------- | ------------------------------------- | ------------------------------ | --------------------------- | -------------------------- | -------------------------------- | ------------------------- | ---------------------------- |
| **humble**     | MIT         | No                    | Yes                              | 60+ headers, OWASP compliance         | CSV, HTML, JSON, PDF, TXT, XML | CLI, proxies, testssl.sh    | Python 3.11+, Docker, Kali | Active, contributions welcome    | Detailed, with guidelines | Efficient, Docker scalable   |
| **shcheck**    | GPL-3.0     | No                    | Yes                              | Standard headers (CSP, HSTS, etc.)    | JSON, text                     | CLI, pip, Docker            | Python 3, simple           | Moderate, open for contributions | Basic README              | Lightweight, Docker scalable |
| **hsecscan**   | GPL-2.0     | No                    | Yes                              | Security headers with recommendations | Text                           | CLI, proxy, POST data       | Python 2.x (outdated)      | Low activity                     | Usage in README           | Limited by Python 2.x        |
| **testssl.sh** | GPL-2.0     | No                    | Yes                              | HSTS, HPKP, etc. (SSL/TLS focus)      | CSV, JSON, HTML                | CLI, Docker, GitHub Actions | No install, multi-platform | Very active                      | Extensive, man page       | Mass testing, parallel scans |
| **DrHEADer**   | MIT         | No (planned)          | Yes                              | Customizable, cross-origin isolation  | Text/JSON                      | Python library, CLI         | Python 3.8+                | Santander team, limited details  | CLI and rules docs        | CI/CD scalable, YAML rules   |

## Recommendations

- **For Comprehensive Analysis**: **humble** is the top choice due to its extensive checks, multiple output formats, and active maintenance. Its MIT license is ideal for commercial projects, and it can be wrapped into a REST API with moderate effort.
- **For SSL/TLS and Header Checks**: **testssl.sh** is recommended for users needing both SSL/TLS and header analysis, with robust community support and scalability.
- **For Simple Checks**: **shcheck** is suitable for basic header checks with minimal setup, though it's less comprehensive.
- **For Customizable Python Integration**: **DrHEADer** is ideal for Python-based projects requiring customizable rules, especially with its planned API.
- **Caution**: **hsecscan**'s reliance on Python 2.x makes it less viable due to compatibility issues.

## Free Tool by MerginIT: Security Header Analyzer

Introducing our free, production-grade Security Header Analyzer at [https://sha.merginit.com](https://sha.merginit.com) — built on top of the open-source tool **humble** (WIP, currently simple custom implementation for MVP). Source code: [github.com/jonasfroeller/header-checker](https://github.com/jonasfroeller/header-checker).

Use it in the browser or integrate it via a free API.

<script lang="ts">
  import LinkPreviewCard from '$lib/components/LinkPreviewCard.svelte';
  import { onMount } from 'svelte';
  let preview = null;
  let url = 'https://sha.merginit.com';
  onMount(async () => {
    const res = await fetch(`/api/preview?url=${encodeURIComponent(url)}`);
    preview = await res.json();
  });
  </script>

{#if preview}
<LinkPreviewCard {preview} />
{/if}

### API Documentation (Free)

Base URL: `https://sha.merginit.com`

Health check

```bash
curl -sS https://sha.merginit.com/api/health
```

Analyze a URL

```bash
curl -sS -X POST https://sha.merginit.com/api/analyze \
   -H "Content-Type: application/json" \
   -d '{"url":"https://example.com", "force_refresh":false}'
```

Set `force_refresh` to `true` to bypass cache.

#### Security Constraints

- Schemes: only `http` and `https` are allowed.
- Ports: only `80` and `443` are allowed (default or explicit).
- Methods used to target: the service issues `HEAD` first; a safe `GET` fallback may be used to read headers without downloading the body.
- Redirects: up to 3 hops; each hop is validated (scheme, port, and that the resolved IP is public).
- IP policy: private, loopback, link-local, multicast, and reserved IPs are blocked (DNS rebinding mitigated per hop).
- CORS: enabled for `/api/*` with origins: `*`, methods `GET`, `POST`, no credentials.
- Rate limits: global limit is 1 request/second per client; `/api/analyze` is limited to 60 requests/second per client.

These constraints help prevent SSRF and keep the service safe and free for public use.

## Sources

[humble GitHub Repository](https://github.com/rfc-st/humble)  
[shcheck GitHub Repository](https://github.com/santoru/shcheck)  
[hsecscan GitHub Repository](https://github.com/riramar/hsecscan)  
[testssl.sh GitHub Repository](https://github.com/drwetter/testssl.sh)  
[DrHEADer GitHub Repository](https://github.com/Santandersecurityresearch/DrHeader)  
[OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers)  
[securityheaders.com](https://securityheaders.com)
