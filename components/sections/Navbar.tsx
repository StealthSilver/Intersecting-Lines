"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-[#21201f] bg-[#ecede8]/95 backdrop-blur-sm font-[var(--font-snippet)] z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6">
        <Link href="/" className="transition hover:opacity-80">
          <Image
            src="/logo.svg"
            alt="MyBlog Logo"
            width={120}
            height={40}
            priority
            className="w-24 h-8 sm:w-[150px] sm:h-[50px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex gap-4 lg:gap-6 text-base lg:text-lg font-bold"
          style={{ fontFamily: "var(--font-snippet)" }}
        >
          <Link href="/essays" className="hover:text-[#e34e30] transition">
            Essays
          </Link>
          <Link href="/stories" className="hover:text-[#e34e30] transition">
            Stories
          </Link>
          <Link href="/poems" className="hover:text-[#e34e30] transition">
            Poems
          </Link>
          <Link href="/books" className="hover:text-[#e34e30] transition">
            Books
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:text-[#e34e30] transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#21201f] bg-[#ecede8]">
          <div
            className="flex flex-col py-4 px-4 gap-4 text-lg font-bold"
            style={{ fontFamily: "var(--font-snippet)" }}
          >
            <Link
              href="/essays"
              className="hover:text-[#e34e30] transition py-2 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Essays
            </Link>
            <Link
              href="/stories"
              className="hover:text-[#e34e30] transition py-2 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/poems"
              className="hover:text-[#e34e30] transition py-2 px-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Poems
            </Link>
            <Link
              href="/books"
              className="hover:text-[#e34e30] transition py-2 px-2"
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
