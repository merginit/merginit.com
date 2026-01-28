export interface LinkItem {
	href: string;
	text?: string;
	icon?: string;
	img?: string;
	images?: string[];
	area?: 'lg' | 'sm';
}

export interface ProjectItem {
	projectType: string;
	category: string;
	date: string;
	datetime: string;
	mainTech: string;
	description: string;
	iconSrc: string;
	url: string;
	productName: string;
	videoUrl?: string;
}

export type DownloadPlatform = 'windows' | 'mac' | 'linux';

export interface DownloadLink {
	platform: DownloadPlatform;
	label: string;
	url: string;
}

export interface Product {
	name: string;
	url: string;
	description: string;
	icon: string;
	githubUrl?: string;
	downloads?: number;
	npmPackage?: string;
	chromeExtensionId?: string;
	downloadLinks?: DownloadLink[];
	windowsDownloadUrl?: string;
	macDownloadUrl?: string;
}

export interface WebsiteProduct extends Product {
	githubUrl: string;
}

export type FreeProductCategory = 'website' | 'desktop' | 'extension' | 'npm';

export interface FreeProduct extends Product {
	slug: string;
	type: FreeProductCategory;
	image: string;
	imageAlt: string;
	longDescription: string;
	features: string[];
	keywords?: string[];
}

export const CATEGORIES = [
	'web-development', // Frontend, backend, full-stack development
	'devops', // CI/CD, deployment, infrastructure
	'database', // Database technologies, SQL, NoSQL
	'cloud-computing', // Cloud services, serverless, hosting
	'ai-ml', // Artificial Intelligence, Machine Learning
	'cybersecurity', // Privacy, security, anonymity
	'open-source', // Open source projects, licenses
	'developer-tools', // IDEs, dev environments, productivity tools
	'api-design', // API architecture, REST, GraphQL
	'data-analytics', // Analytics, monitoring, insights
	'career', // Career development, industry trends
	'productivity', // Productivity, time management, work-life balance
	'opinion', // Thought leadership, critiques
	'tutorial', // How-to guides, tutorials
	'comparison', // Technology comparisons
	'announcement' // Updates, announcements
] as const;

export type Categories = (typeof CATEGORIES)[number];

export interface BasicMeta {
	title: string;
	description: string;
	type?: string;
}

export type Post = BasicMeta & {
	slug: string;
	date: string;
	updateDate?: string;
	categories: Categories[];
	published: boolean;
	author: string;
	readingTime: string;
	tags: string[];
};

export interface LinkPreview {
	url: string;
	title: string;
	description: string;
	favicon: string;
	image?: string;
}
