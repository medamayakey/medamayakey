import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/', '/search'],
	ignoredRoutes: ['/favicon.ico', '/rina.png', '/yuki.png', '/kai.png'],
});
// export default authMiddleware({});

export const config = {
	matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
