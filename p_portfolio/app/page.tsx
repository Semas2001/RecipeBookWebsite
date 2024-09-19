import Hero from '@/components/Hero'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Hero/>
      <h1>Semas Armonaitis</h1>
      <Link href="/projects">Projects</Link>
      <br></br>
      <Link href="/contact">Contact Me</Link>
    </main>
  )
}
