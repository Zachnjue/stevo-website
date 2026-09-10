import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-3 sm:px-10">
        <div>
          <p className="font-display text-2xl">Thee Printing Hub</p>
          <p className="eyebrow mt-3 text-paper/50">
            Ink is our underlying foundation
          </p>
        </div>

        <div className="text-sm text-paper/70">
          <p className="eyebrow mb-4 text-paper">Sitemap</p>
          <ul className="space-y-2">
            <li><Link href="/about" className="link-reveal">About Us</Link></li>
            <li><Link href="/services" className="link-reveal">Services</Link></li>
            <li><Link href="/catalogue" className="link-reveal">Catalogue</Link></li>
            <li><Link href="/contact" className="link-reveal">Contact</Link></li>
          </ul>
        </div>

        <div className="text-sm text-paper/70">
          <p className="eyebrow mb-4 text-paper">Contact</p>
          <ul className="space-y-2">
            <li>Latema Plaza, 3rd Floor, Room 302</li>
            <li>
              <a href="tel:0748679132" className="link-reveal">
                0748 679 132
              </a>
            </li>
            <li>
              <a href="mailto:theeprinting.hub@gmail.com" className="link-reveal">
                theeprinting.hub@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10 px-6 py-6 text-center text-xs text-paper/40 sm:px-10">
        © {new Date().getFullYear()} Thee Printing Hub. All rights reserved.
      </div>
    </footer>
  );
}
