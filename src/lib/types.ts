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

export interface Product {
	name: string;
	url: string;
	description: string;
	icon: string;
	githubUrl?: string;
	downloads?: number;
	npmPackage?: string;
}

export interface WebsiteProduct extends Product {
	githubUrl: string;
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

export type Post = {
	title: string;
	slug: string;
	description: string;
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
