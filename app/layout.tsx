import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { Urbanist } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import ModalProvider from "@/providers/modalProvider"
import ToastProvider from "@/providers/toastProvider"

const font = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next Store",
  description: "Store",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
