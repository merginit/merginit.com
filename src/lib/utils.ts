import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Decodes HTML entities in a string (e.g., &quot; -> ") // needs improvement
export function decodeHtmlEntities(str: string): string {
	if (!str) return '';
	return str.replace(/&([^;]+);/g, (entity, entityCode) => {
		if (entityCode === 'amp') return '&';
		if (entityCode === 'lt') return '<';
		if (entityCode === 'gt') return '>';
		if (entityCode === 'quot') return '"';
		if (entityCode === 'apos') return "'";
		// Numeric entities
		if (entityCode[0] === '#') {
			const code =
				entityCode[1] === 'x' || entityCode[1] === 'X'
					? parseInt(entityCode.substr(2), 16)
					: parseInt(entityCode.substr(1), 10);
			return String.fromCharCode(code);
		}
		return entity;
	});
}
