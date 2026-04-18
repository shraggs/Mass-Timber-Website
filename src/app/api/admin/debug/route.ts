import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasUsername: !!process.env.ADMIN_USERNAME,
    hasPassword: !!process.env.ADMIN_PASSWORD,
    hasGithubToken: !!process.env.GITHUB_TOKEN,
    usernameLength: (process.env.ADMIN_USERNAME || '').length,
    passwordLength: (process.env.ADMIN_PASSWORD || '').length,
  });
}
