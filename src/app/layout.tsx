import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import ClientPopupWrapper from "@/components/ClientPopupWrapper";

export const metadata: Metadata = {
  title: {
    default: "Syncjin Portfolio | Frontend Developer & React Specialist",
    template: "%s | Syncjin Portfolio",
  },
  description: "Frontend 개발자 Syncjin의 포트폴리오입니다. React, React Native, Next.js, TypeScript를 활용한 웹, 앱 개발 경험과 프로젝트를 확인해보세요.",
  keywords: [
    "프론트엔드 개발자",
    "React 개발자",
    "React Native 개발자",
    "Next.js 개발자",
    "TypeScript 개발자",
    "웹 개발자",
    "앱 개발",
    "포트폴리오",
    "프론트엔드",
    "JavaScript",
    "React",
    "React Native",
    "Next.js",
    "TypeScript",
    "웹 개발",
    "앱 개발",
  ],
  authors: [{ name: "Syncjin" }],
  creator: "Syncjin",
  publisher: "Syncjin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://syncjin.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://syncjin.com",
    title: "Syncjin Portfolio | Frontend Developer & React Specialist",
    description: "Frontend 개발자 Syncjin의 포트폴리오입니다. React, React Native, Next.js, TypeScript를 활용한 웹, 앱 개발 경험과 프로젝트를 확인해보세요.",
    siteName: "Syncjin Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Syncjin Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syncjin Portfolio | Frontend Developer & React Specialist",
    description: "Frontend 개발자 Syncjin의 포트폴리오입니다. React, React Native, Next.js, TypeScript를 활용한 웹, 앱 개발 경험과 프로젝트를 확인해보세요.",
    images: ["/og-image.svg"],
    creator: "@syncjin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   yahoo: "your-yahoo-verification-code",
  // },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Syncjin",
              jobTitle: "Frontend Developer",
              description: "React, React Native, Next.js, TypeScript를 전문으로 하는 프론트엔드 개발자",
              url: "https://syncjin.com",
              sameAs: ["https://github.com/syncjin", "https://linkedin.com/in/syncjin"],
              knowsAbout: ["React", "React Native", "Next.js", "TypeScript", "JavaScript", "Frontend Development", "Web Development", "App Development"],
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
          <ClientPopupWrapper />
        </Providers>
      </body>
    </html>
  );
}
