import { ReactNode } from 'react'
import './globals.css'
import { 
  Roboto_Serif as Roboto,  
  Bai_Jamjuree as BaiJamJuree 
} from 'next/font/google'


const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

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
        ${roboto.variable} 
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
