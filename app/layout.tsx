import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getImageProps } from "next/image";
import NavBar from "./NavBar/page";

import library from "@/public/library.jpeg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    src: library,
  });
  const backgroundImage = getBackgroundImage(srcSet);
  const style = { height: "100%", width: "100%", backgroundImage };
  return (
    <html lang="en" data-theme="winter">
      <body style={style}>
        <NavBar />
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
