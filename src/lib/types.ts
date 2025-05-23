export interface LinkItem {
    href: string;
    text?: string;
    icon?: string;
    img?: string;
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
}
