import '@/styles/global.scss'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Willow Bark Management',
  description: 'Real estate management company',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='mainWrapper'>
          <Nav />
            {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
