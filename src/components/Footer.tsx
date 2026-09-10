import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold">
            <span className="text-brand-pink">Thee</span> Printing Hub
          </p>
          <p className="mt-2 text-sm italic text-brand-blue">
            Ink is our underlying foundation
          </p>
          <div className="mt-4 flex gap-2">
            <span className="h-4 w-4 rounded-sm bg-brand-blue" />
            <span className="h-4 w-4 rounded-sm bg-brand-pink" />
            <span className="h-4 w-4 rounded-sm bg-white" />
            <span className="h-4 w-4 rounded-sm bg-brand-yellow" />
          </div>
        </div>

        <div className="text-sm text-white/80">
          <p className="mb-3 font-semibold text-white">Quick Links</p>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-brand-yellow">About Us</Link></li>
            <li><Link href="/services" className="hover:text-brand-yellow">What We Do</Link></li>
            <li><Link href="/catalogue" className="hover:text-brand-yellow">Catalogue</Link></li>
            <li><Link href="/contact" className="hover:text-brand-yellow">Contact</Link></li>
          </ul>
        </div>

        <div className="text-sm text-white/80">
          <p className="mb-3 font-semibold text-white">Contact</p>
          <ul className="space-y-2">
            <li>Latema Plaza, 3rd Floor, Room 302</li>
            <li>
              <a href="tel:0748679132" className="hover:text-brand-yellow">
                0748 679 132
              </a>
            </li>
            <li>
              <a href="mailto:theeprinting.hub@gmail.com" className="hover:text-brand-yellow">
                theeprinting.hub@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Thee Printing Hub. All rights reserved.
      </div>
    </footer>
  );
}
