'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AdminGuard } from '@/components/admin/AdminGuard';
import {
  Users, MapPin, Building2, GraduationCap, Package, MessageCircle,
  HelpCircle, Settings, LayoutDashboard, LogOut, ChevronRight, FileText
} from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Leadership', href: '/admin/leadership', icon: Users },
  { label: 'Contractors', href: '/admin/contractors', icon: Building2 },
  { label: 'Projects', href: '/admin/projects', icon: FileText },
  { label: 'Training Centers', href: '/admin/training-centers', icon: GraduationCap },
  { label: 'Suppliers', href: '/admin/suppliers', icon: Package },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageCircle },
  { label: 'Locations', href: '/admin/locations', icon: MapPin },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <AdminGuard>{children}</AdminGuard>;
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#0f1f17] flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1E3A2A] border-r border-white/[0.06] flex flex-col flex-shrink-0">
          <div className="p-5 border-b border-white/[0.06]">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/images/Main_Mass_Timber_Logo.PNG"
                alt="IW Mass Timber"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="text-sm font-bold text-cream font-[family-name:var(--font-jakarta)]">IW Mass Timber</div>
                <div className="text-xs text-cream/40">Admin Panel</div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-cream/60 hover:text-cream hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                  {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-white/[0.06]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cream/60 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cream/60 hover:text-cream hover:bg-white/5 transition-colors mt-1"
            >
              <ChevronRight className="w-4 h-4" />
              View Site
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
