import { NextResponse } from 'next/server';

export async function middleware(req) {
  const session = req.session;
  console.log(session);
  // You could also check for any property on the session object,
  // like role === "admin" or name === "John Doe", etc.
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  if (!session) return NextResponse.rewrite(url);
  // If user is authenticated, continue.
}
