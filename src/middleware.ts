import { NextRequest, NextResponse } from 'next/server';

const ADMIN_COOKIE_NAME = 'admin.session';

export function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;

  const adminCookie = cookies.get(ADMIN_COOKIE_NAME);
  const isLoginPage = nextUrl.pathname.includes('/admin/login');

  if (adminCookie && isLoginPage) {
    return NextResponse.redirect(`${nextUrl.origin}/admin`);
  }

  const isAdminPath = nextUrl.pathname.includes('admin');

  if (isAdminPath && !adminCookie && !isLoginPage) {
    return NextResponse.redirect(`${nextUrl.origin}/admin/login`);
  }

  return NextResponse.next();
}
