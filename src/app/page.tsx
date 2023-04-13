import Image from 'next/image'
import { Inter } from 'next/font/google'
import Form from './components/Form'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className={`${inter.className} mb-3 text-3xl font-semibold`}>
        Type Anything
      </h1>
      <Form/>
    </main>
  )
}
