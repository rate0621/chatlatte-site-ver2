import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Toaster } from "@/app/components/ui/sonner";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: {
    default: "chatlatte｜エンジニアがいない会社の「最初のエンジニア」",
    template: "%s | chatlatte",
  },
  description:
    "エンジニアがいない・足りない会社のための技術パートナー。AI業務自動化で月150時間削減、クラウドコスト月10万円超削減の実績。技術顧問からスポット開発まで、山形県天童市から全国対応。まずは30分の無料相談から。",
  metadataBase: new URL("https://www.chatlatte.com"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "chatlatte",
    title: "chatlatte｜エンジニアがいない会社の「最初のエンジニア」",
    description:
      "AI業務自動化で月150時間削減の実績。課題の整理から実装まで、社内側に立って伴走します。30分の無料相談から。",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@chatrate0621",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "chatlatte",
  description:
    "エンジニアがいない・足りない会社のための技術支援。AI業務自動化、技術顧問、スポット開発。",
  url: "https://www.chatlatte.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "天童市",
    addressRegion: "山形県",
    addressCountry: "JP",
  },
  areaServed: "JP",
  sameAs: ["https://x.com/chatrate0621"],
  knowsAbout: [
    "AI業務自動化",
    "技術顧問",
    "AWS",
    "Google Tag Manager",
    "Google Analytics 4",
    "Webアプリケーション開発",
    "セキュリティ対応",
  ],
} as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7967054821483695"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MZG4KBNS');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZG4KBNS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
