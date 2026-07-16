import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Penta Security Demo",
  description: "JSON 기반 펜타시큐리티 웹사이트/CMS 데모",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
