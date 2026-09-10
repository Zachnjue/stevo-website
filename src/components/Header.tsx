"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "What We Do" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-black/5 shadow-sm" : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <Link href="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="text-xl font-bold tracking-tight text-brand-black">
            <span className="text-brand-pink">Thee</span> Printing Hub
          </span>
          <span
            className={`italic text-brand-blue transition-all duration-300 ${
              scrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-4 text-[11px] opacity-100"
            }`}
          >
            Ink is our underlying foundation
          </span>
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-brand-black md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 transition-colors hover:text-brand-pink ${
                  active ? "text-brand-pink" : ""
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-pink transition-transform duration-200 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-brand-blue px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-blue-dark hover:shadow-md md:inline-block"
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
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-2 py-2 hover:bg-black/5 ${
                  active ? "bg-black/5 text-brand-pink" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
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
