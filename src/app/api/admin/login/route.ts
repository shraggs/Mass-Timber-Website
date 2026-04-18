import { NextResponse } from 'next/server';
import { validateCredentials, createToken, setAuthCookie } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!validateCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await createToken();
    await setAuthCookie(token);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
