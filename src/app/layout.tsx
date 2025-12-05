import type { Metadata } from "next";
import "./globals.css";
import { generalSans, dmSans } from "./fonts";
import { ReduxProvider } from "@/redux/provider";
import ToastProvider from "@/lib/ToastProvider";

export const metadata: Metadata = {
  title:
    "iTpreneur – IT Classes in Pune, IT Course in Pune, IT Training Institute In Pune",
  description:
    "iTpreneur is one of the Best IT Training Institutes in Pune, India, dedicated to introducing new skills and talent into India",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${generalSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReduxProvider>{children}</ReduxProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
