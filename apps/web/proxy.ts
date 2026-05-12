import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const locales = ["en", "uk", "ru"] as const;
type Locale = (typeof locales)[number];

function getLocaleFromRequest(request: NextRequest): Locale {
  const acceptLang = request.headers.get("accept-language") ?? "";
  if (acceptLang.startsWith("uk")) return "uk";
  if (acceptLang.startsWith("ru")) return "ru";
  return "en";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firstSegment = pathname.split("/")[1] as Locale;
  const hasLocale = locales.includes(firstSegment);

  if (!hasLocale) {
    const locale = getLocaleFromRequest(request);
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Защита /[lang]/profile
  const pathWithoutLocale = pathname.slice(firstSegment.length + 1) || "/";
  if (pathWithoutLocale.startsWith("/profile")) {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.redirect(new URL(`/${firstSegment}/login`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
