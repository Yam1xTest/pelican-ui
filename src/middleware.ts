// https://gitnation.com/contents/content-security-policy-with-nextjs-leveling-up-your-websites-security/video
// https://nextjs.org/docs/app/guides/content-security-policy
// https://github.com/TourmalineCore/pelican-documentation/pull/19

import { NextRequest, NextResponse } from 'next/server';
import { setCspHeaders } from './common/middleware/setCspHeaders';

// This middleware sets a Content Security Policy (CSP) with a per-request nonce (random string)
// to enhance security by allowing only specific scripts and styles to run
export function middleware(request: NextRequest) {
  // Clone original request headers
  const requestHeaders = new Headers(request.headers);

  // Create the next response with request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (process.env.CSP_ENABLED === `true`) {
    // Set the CSP header in the actual HTTP response to the browser
    setCspHeaders({
      headers: response.headers,
    });
  }

  return response;
}

// Middleware configuration: match all paths EXCEPT specific static and API files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      // Apply the middleware to everything except Next.js API routes and static assets
      source: `/((?!api|_next/static|_next/image|favicon.ico).*)`,
      // These headers are added by Next.js or browsers when preloading routes or resources
      // We skip applying middleware to avoid unnecessary work or CSP processing for them
      // For example, when you hover over the link and Next preloads a preview of a new page
      missing: [
        {
          type: `header`,
          key: `next-router-prefetch`,
        },
        {
          type: `header`,
          key: `purpose`,
          value: `prefetch`,
        },
      ],
    },
  ],
};
