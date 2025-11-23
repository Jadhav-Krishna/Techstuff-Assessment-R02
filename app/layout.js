import { Inter } from "next/font/google"
import "./globals.css"

const primaryFont = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
})

function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={primaryFont.className}>
        <main className="min-h-screen bg-slate-900 text-slate-100">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout;
