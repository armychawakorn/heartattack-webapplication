import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "AI จำแนกโรคหัวใจล้มเหลว",
  description: "สร้างโดย นายชวกร เนืองภา 653450087-5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-slate-600`} >
        <Nav />
        {children}
      </body>
    </html>
  );
}
