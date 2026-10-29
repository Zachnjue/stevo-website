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
  metadataBase: new URL("https://www.theeprintinghub.com"),
  title: "Thee Printing Hub | Branding & Printing in Nairobi",
  description:
    "Thee Printing Hub is a branding and printing company in Nairobi — corporate identity, staff uniforms, promotional merchandise, office supplies, and printing services.",
  applicationName: "Thee Printing Hub",
  openGraph: {
    type: "website",
    siteName: "Thee Printing Hub",
    locale: "en_KE",
    title: "Thee Printing Hub | Branding & Printing in Nairobi",
    description:
      "Corporate identity, staff uniforms, promotional merchandise, office supplies, and printing services in Nairobi.",
    images: ["/images/logo.png"],
  },
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
              "@id": "https://www.theeprintinghub.com/#business",
              url: "https://www.theeprintinghub.com",
              logo: "https://www.theeprintinghub.com/images/logo.png",
              image: "https://www.theeprintinghub.com/images/logo.png",
              alternateName: ["Thee Printing Hub Nairobi", "Printing Hub"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Thee Printing Hub",
              alternateName: "Thee Printing Hub Nairobi",
              url: "https://www.theeprintinghub.com",
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
