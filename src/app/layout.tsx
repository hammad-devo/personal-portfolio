import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hammad Tahir - Full Stack Developer",
  description: "Professional portfolio of a Full Stack Developer specializing in React, Next.js, Node.js, Laravel, and React Native.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "Laravel", "React Native", "TypeScript"],
  authors: [{ name: "Hammad Tahir" }],
  creator: "Hammad Tahir",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hammad-devo.github.io",
    title: "Hammad Tahir - Full Stack Developer",
    description: "Professional portfolio of a Full Stack Developer",
    siteName: "Hammad Portfolio",
  },
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
