import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Thee Printing Hub | Branding & Printing",
  description:
    "Branding and printing company in Nairobi — corporate identity, staff uniforms, promotional merchandise, office supplies, and printing services.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Thee Printing Hub",
              url: "https://www.theeprintinghub.com",
              email: "theeprinting.hub@gmail.com",
              telephone: "+254748679132",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Latema Plaza Building, 3rd Floor, Room No. 302",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              sameAs: ["https://www.instagram.com/theeprintinghub"],
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
