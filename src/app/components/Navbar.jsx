'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import useStore from '../store/Store';

function GithubIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const products = useStore((state) => state.product);
  const totalItems = products.reduce((sum, item) => sum + item.count, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xlg text-slate-900 dark:text-slate-100 hover:opacity-80 transition-opacity"
        >
          <span className="bg-indigo-600 text-white text-xl font-bold px-2 py-1 rounded-lg tracking-wide">
           Welcome to our shop
          </span>
          
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* GitHub */}
          <a
            href="https://github.com/elyasforghani"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all"
            title="Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center bg-indigo-600 text-white text-[10px] font-bold rounded-full px-1 leading-none">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
