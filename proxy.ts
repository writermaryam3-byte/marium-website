import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Pages, Routes } from "./app/types/enums";
import { redirect } from "next/navigation";
import { isatty } from "tty";
import { UserRole } from "./lib/generated/prisma/enums";
export default withAuth(
  async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isAuth = await getToken({
      req: request,
    });
    const protectedRoutes = [Routes.PROFILE, Routes.ADMIN];
    const isAuthRoute = pathName.startsWith(`${Routes.AUTH}`);
    const isAdminRoute = pathName.startsWith(Routes.ADMIN);
    const isProtectedRoute = protectedRoutes.some((route) => {
      return pathName.startsWith(route);
    });
    if (isAuth && isAuthRoute) {
      const role = isAuth.role;
      if (role === UserRole.ADMIN) {
        return NextResponse.redirect(new URL(`${Routes.ADMIN}`, request.url));
      }
      return NextResponse.redirect(new URL(`${Routes.PROFILE}`, request.url));
    } else if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`${Routes.AUTH}/${Pages.LOGIN}`, request.url)
      );
    } else if (isAuth && isAdminRoute) {
      const role = isAuth.role;
      if (role === UserRole.USER) {
        return NextResponse.redirect(new URL(`${Routes.PROFILE}`, request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
