import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { prefixBasePath } from "./utils/path";



const PROTECTED_ROUTES = ["/profile", "/dashboard"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const lang = req.cookies.get("NEXT_LOCALE")?.value || "en";
  const accessToken = req.cookies.get('X-Access-Token');
  const pathSegments = pathname.split("/");
  const basePath = pathSegments.length > 2 ? `/${pathSegments[2]}` : pathname;
  
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${lang}`, req.url));
  }

  if (PROTECTED_ROUTES.includes(basePath) && !accessToken) {
    return NextResponse.redirect(new URL(prefixBasePath(`/${lang}/login`), req.url));
  }
  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ["/(en|fr|es|tl|ar)/:path*"],
};
