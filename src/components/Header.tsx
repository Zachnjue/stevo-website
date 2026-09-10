"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "What We Do" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="text-xl font-bold tracking-tight text-brand-black">
            <span className="text-brand-pink">Thee</span> Printing Hub
          </span>
          <span className="text-[11px] italic text-brand-blue">
            Ink is our underlying foundation
          </span>
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-brand-black md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-brand-pink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark md:inline-block"
        >
          Get a Quote
        </Link>

        <button
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-brand-black" />
          <span className="h-0.5 w-6 bg-brand-black" />
          <span className="h-0.5 w-6 bg-brand-black" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-white px-6 py-4 text-sm font-medium text-brand-black md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-2 hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-brand-blue px-5 py-2 text-center font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
