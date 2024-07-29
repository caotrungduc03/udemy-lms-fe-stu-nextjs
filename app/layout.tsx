
import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";
import StoreProvider from './StoreProvider';
const udemySans = localFont({
  src: [
    {
      path: "../fonts/Udemy-Sans-Regular-v1.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Udemy-Sans-Bold-v1.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-udemy-sans",
});

export const metadata: Metadata = {
  title: "Online Courses - Learn Anything, On Your Schedule | Udemy",
  description: "Generated by create next app",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
  ],
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
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
