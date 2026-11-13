import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Desktop } from "@/components/shell/Desktop";
import { DEFAULT_THEME_ID, themeInitScript } from "@/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Hasan Ali", template: "%s | Hasan Ali" },
  description: "Personal website of Hasan Ali: projects, about, links, and a terminal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME_ID}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Desktop>{children}</Desktop>
      </body>
    </html>
  );
}
