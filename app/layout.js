import Bar from './bar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WanBridge Token Pair Manager',
  description: 'WanBridge Token Pair Manager',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1>WanBridge Token Pair Manager</h1>
        <Bar />
        {children}</body>
    </html>
  )
}
