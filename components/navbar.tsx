"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChefHat, X } from "lucide-react";
import { FaHamburger } from "react-icons/fa";
import posthog from "posthog-js";

interface NavItem {
  href: string;
  label: string;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [fikiEnabled, setFikiEnabled] = useState(false);

  useEffect(() => {
    posthog.onFeatureFlags(function () {
      if (posthog.isFeatureEnabled("enable-fiki-navigation")) {
        setFikiEnabled(true);
      }
    });
  }, [setFikiEnabled]);

  const navItems: NavItem[] = [
    fikiEnabled && { href: "/fiki", label: "Fiki" },
  ].filter((item): item is NavItem => Boolean(item));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-b">
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center justify-center" href="/">
            <ChefHat className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">MealWell</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-4"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          {navItems.length > 0 && (
            <button
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaHamburger className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
