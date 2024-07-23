import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";

const udemySans = localFont({
  src: [
    {
      path: "./fonts/Udemy-Sans-Regular-v1.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Udemy-Sans-Bold-v1.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-udemy-sans",
});

export const metadata: Metadata = {
  title: "Online Courses - Learn Anything, On Your Schedule | Udemy",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={udemySans.variable}>
        <div className="flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
