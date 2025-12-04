import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";

// DM Sans (Google)
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
});

// General Sans (Local – exact filenames)
export const generalSans = localFont({
  src: [
    {
      path: "../fonts/GeneralSans-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-general",
  display: "swap",
});
