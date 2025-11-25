import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import ClientLayout from "./client-layout"

export const metadata: Metadata = {
  title: "ZAWAR — Kalkulator Zakat & Warisan Syariah",
  description:
    "Kalkulator akurat untuk menghitung zakat penghasilan, zakat maal, zakat emas, zakat fitrah, dan pembagian warisan sesuai hukum Islam.",
  keywords: "zakat, warisan, faraidh, kalkulator, islam, syariah",
  authors: [{ name: "ZAWAR" }],
  openGraph: {
    title: "ZAWAR — Kalkulator Zakat & Warisan Syariah",
    description: "Aplikasi web gratis untuk menghitung zakat dan pembagian warisan sesuai syariah Islam",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
    generator: 'v0.app'
}

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <ClientLayout>
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  )
}
