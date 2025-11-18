"use client";

import React from "react";
import { Mail, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex fixed right-0 top-0 h-screen w-14 lg:w-16 border-l border-[#21201f] bg-[#ecede8]/95 backdrop-blur-sm flex-col items-center justify-center gap-6 lg:gap-8 text-[#21201f] shadow-lg z-40">
        <Link
          href="mailto:intersectinglines1005@mail.com"
          target="_blank"
          className="hover:text-[#e34e30] transition"
          aria-label="Email"
        >
          <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
        <Link
          href="https://www.instagram.com/_intersectinglines/"
          target="_blank"
          className="hover:text-[#e34e30] transition"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          className="hover:text-[#e34e30] transition"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
        <Link
          href="https://youtube.com"
          target="_blank"
          className="hover:text-[#e34e30] transition"
          aria-label="YouTube"
        >
          <Youtube className="w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
      </aside>

      {/* Mobile Footer Social Links */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[#21201f] bg-[#ecede8]/95 backdrop-blur-sm z-40">
        <div className="flex items-center justify-center gap-8 py-4 text-[#21201f]">
          <Link
            href="mailto:intersectinglines1005@mail.com"
            target="_blank"
            className="hover:text-[#e34e30] transition"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.instagram.com/_intersectinglines/"
            target="_blank"
            className="hover:text-[#e34e30] transition"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="hover:text-[#e34e30] transition"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            className="hover:text-[#e34e30] transition"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
