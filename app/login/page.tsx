import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

import Link from 'next/link'
import { Form as LoginForm } from "@/app/login/form"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-[80dvh] overflow-clip text-black container mx-auto p-4">
      <div className=' flex-grow'>
    <div className="h-[80dvh] w-screen flex justify-center   items-center">
      <div className="sm:shadow-xl bg- px-8 pb-8 sm:bg- bg-slate-50 rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl mt-5">Login</h1>
        <LoginForm />
      </div>
    </div>
    <Footer/>
    </div>
    </div>
  )
}
