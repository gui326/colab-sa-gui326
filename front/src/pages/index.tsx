import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

import HomeScreen from "@/screens/HomeScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Colab SA GUI</title>
        <meta name="description" content="POC de integração com IA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${geistSans.className} ${geistMono.className}`}>
        <HomeScreen />
      </div>
    </>
  );
}
