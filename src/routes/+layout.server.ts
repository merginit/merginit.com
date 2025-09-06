export const load = ({ url }) => {
	const { pathname, searchParams } = url as URL;
	const noCookie = searchParams.get('no_cookie') === '1';
	return {
		pathname,
		noCookie
	};
};
