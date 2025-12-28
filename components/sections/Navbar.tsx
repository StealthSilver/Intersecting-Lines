"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-[#21201f] dark:border-[#3A3A3A] bg-[#F5F5F0]/95 dark:bg-[#1E1E1E]/95 backdrop-blur-sm font-[var(--font-snippet)] z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6">
        <Link href="/" className="transition hover:opacity-80">
          <Image
            src="/icon.svg"
            alt="Intersecting Lines Logo"
            width={100}
            height={40}
            priority
            className="w-20 h-5 sm:w-[120px] sm:h-[40px] dark:hidden"
          />
          <Image
            src="/icon_dark.svg"
            alt="Intersecting Lines Logo"
            width={100}
            height={40}
            priority
            className="w-20 h-5 sm:w-[120px] sm:h-[40px] hidden dark:block"
          />
        </Link>

        {/* Desktop Navigation + Theme Toggle */}
        <div className="flex items-center gap-4 lg:gap-8">
          <div
            className="hidden md:flex gap-4 lg:gap-6 text-base lg:text-lg font-bold"
            style={{ fontFamily: "var(--font-snippet)" }}
          >
            <Link
              href="/essays"
              className="hover:text-[#1F6F78] dark:hover:text-[#4A9BA3] transition"
            >
              Essays
            </Link>
            <Link
              href="/stories"
              className="hover:text-[#1F6F78] dark:hover:text-[#4A9BA3] transition"
            >
              Stories
            </Link>
            <Link
              href="/poems"
              className="hover:text-[#1F6F78] dark:hover:text-[#4A9BA3] transition"
            >
              Poems
            </Link>
            <Link
              href="/books"
              className="hover:text-[#1F6F78] dark:hover:text-[#4A9BA3] transition"
            >
              Books
            </Link>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:text-[#1F6F78] dark:hover:text-[#4A9BA3] transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#21201f] dark:border-[#3A3A3A] bg-[#F5F5F0] dark:bg-[#1E1E1E] transition-colors duration-300">
          <div
            className="flex flex-col py-4 px-4 gap-4 text-lg font-bold"
            style={{ fontFamily: "var(--font-snippet)" }}
          >
            <Link
              href="/essays"
              className="hover:text-[#1F6F78] dark:hover:text-[#4A9BA3] transition py-2 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Essays
            </Link>
            <Link
              href="/stories"
              className="hover:text-[#1F6F78] dark:hover:text-[#4A9BA3] transition py-2 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/poems"
              className="hover:text-[#1F6F78] dark:hover:text-[#4A9BA3] transition py-2 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Poems
            </Link>
            <Link
              href="/books"
              className="hover:text-[#1F6F78] dark:hover:text-[#4A9BA3] transition py-2 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
