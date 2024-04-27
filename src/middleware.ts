import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/', '/search'],
});
// export default authMiddleware({});

export const config = {
	matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
