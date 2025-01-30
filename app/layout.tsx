import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"

const vazirmatn = Vazirmatn({ subsets: ["arabic"] })

export const metadata: Metadata = {
  title: "خرید و فروش استار و تون کوین",
  description: "اپلیکیشن تلگرام برای خرید و فروش استار و تون کوین",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${vazirmatn.className} bg-black text-white overflow-x-hidden`}>{children}</body>
    </html>
  )
}

