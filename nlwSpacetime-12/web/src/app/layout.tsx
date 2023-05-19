import { ReactNode } from 'react'
import './globals.css'
import { 
  Inter,  
  Bai_Jamjuree as BaiJamJuree 
} from 'next/font/google'


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const baiJamjuree = BaiJamJuree({ 
  subsets: ['latin'], 
  weight: '700', 
  variable: '--font-bai-jamjuree' 
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo construída com React, Next, TailwindCSS e Typescript',
}

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className={`
        ${inter.variable} 
        ${baiJamjuree.variable} 
        font-sans 
        bg-gray-900
        text-gray-100`}
    >
        {children}
      </body>
    </html>
  )
}
