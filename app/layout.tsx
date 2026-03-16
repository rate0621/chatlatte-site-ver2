import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Toaster } from "@/app/components/ui/sonner";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: {
    default: "chatlatte - テクニカルディレクション・業務改善",
    template: "%s | chatlatte",
  },
  description:
    "山形県拠点のフリーランス。業務効率化ツール開発、マーケティング基盤構築、Webサイト運用改善など、課題に合わせた技術支援を行います。",
  metadataBase: new URL("https://www.chatlatte.com"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "chatlatte",
    images: ["/chatlatte_logo.png"],
  },
  twitter: {
    card: "summary",
    site: "@chatrate0621",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
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
