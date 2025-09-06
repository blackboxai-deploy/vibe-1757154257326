'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/components/providers/auth-provider';
import { AuthUser } from '@/lib/auth';

interface NavigationLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navigationLinks: NavigationLink[];
  user: AuthUser | null;
  isLoading: boolean;
  isScrolled: boolean;
}

export function MobileMenu({ navigationLinks, user, isLoading, isScrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const userMenuItems = user?.role === 'admin' ? [
    { href: '/admin/dashboard', label: 'Admin Dashboard' },
    { href: '/admin/clients', label: 'Manage Clients' },
    { href: '/admin/albums', label: 'Manage Albums' },
    { href: '/admin/settings', label: 'Settings' },
  ] : [
    { href: '/client/dashboard', label: 'My Dashboard' },
    { href: '/client/albums', label: 'My Albums' },
    { href: '/client/profile', label: 'Profile Settings' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`${
            isScrolled ? 'text-gray-700' : 'text-white'
          } hover:bg-gray-100/20 p-2`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-1">
          {/* Navigation Links */}
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Separator className="my-4" />

          {/* User Section */}
          {isLoading ? (
            <div className="px-3 py-2">
              <div className="w-32 h-4 bg-gray-200 animate-pulse rounded" />
            </div>
          ) : user ? (
            <div className="space-y-1">
              {/* User Info */}
              <div className="px-3 py-2 text-sm text-gray-600">
                <p className="font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>

              <Separator className="my-2" />

              {/* User Menu Items */}
              {userMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <Separator className="my-2" />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                onClick={handleLinkClick}
                className="block w-full"
              >
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
              </Link>
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className="block w-full"
              >
                <Button className="w-full">
                  Book Session
                </Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}