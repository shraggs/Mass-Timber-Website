'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't guard the login page itself
    if (pathname === '/admin/login') {
      setChecked(true);
      return;
    }

    // Check if admin-token cookie exists (client-side check — server also verifies)
    const hasToken = document.cookie.includes('admin-token=');
    if (!hasToken) {
      router.replace('/admin/login');
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  if (!checked && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
