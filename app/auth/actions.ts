'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function verifyPassword(
  formData: FormData,
): Promise<{ error: string } | never> {
  const password = formData.get('password');

  if (typeof password !== 'string' || password.length === 0) {
    return { error: 'Password is required.' };
  }

  const sitePassword = process.env.NEXT_PUBLIC_SITE_PASSWORD;

  if (!sitePassword) {
    // No password configured — grant access
    const cookieStore = await cookies();
    cookieStore.set('site_auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    redirect('/');
  }

  if (password !== sitePassword) {
    return { error: 'Incorrect password.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('site_auth', sitePassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  redirect('/');
}
