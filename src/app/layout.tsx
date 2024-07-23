import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick And Morty Web APP",
  description: "This is a nextjs app to display rick and morty API data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          "flex flex-col justify-center items-center min-h-screen h-full px-5 lg:px-20"
        }
      >
        {children}
      </body>
    </html>
  );
}
