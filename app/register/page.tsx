"use client"
import React, { useState} from 'react'
import {useRouter}  from 'next/navigation'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


const Register = () => {
    const [error, setError] = useState("");
    const router= useRouter();



    const handleSubmit = async(e:any) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        

        if(!password || password.length < 8) {
            setError("password is invalid")
            return;
        }

        try {
            const res = await fetch("/api/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    name
                })
            })
            if(res.status === 400){
                setError("This email is already registered");
            }
            if(res.status === 200){
                setError("");
                router.push("/login");
            }

        }catch(error){
            setError("Error, try again");
            console.log(error);
        }

    };

  return (
    <div className="flex flex-col min-h-[80dvh] overflow-clip text-black container mx-auto p-4">
        <div className=' flex-grow'>
                <div className="h-[80dvh] w-screen flex justify-center   items-center">
                    <div className="sm:shadow-xl bg- px-8 pb-8 sm:bg- bg-slate-50 rounded-xl space-y-12">
                        <h1 className="font-semibold text-2xl mt-5">Register</h1>
                        <form onSubmit={handleSubmit} className="space-y-12 w-full sm:w-[400px]">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                            type='text'
                            className="w-full"
                            name='email'
                            placeholder='Email'
                            required
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                            type='password'
                            className="w-full"
                            name='password'
                            placeholder='Password'
                            required
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                            type='text'
                            className="w-full"
                            name='name'
                            placeholder='Name'
                            required
                            />
                    </div>
                        {error && <Alert>{error}</Alert>}
                            <div className="w-full">
                                <Button className="w-full bg-[#cfbfa7] text-black py-2 rounded-lg hover:bg-[#e4d5b7]" size="lg">
                                Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        <Footer/>
    </div>
  )
}

export default Register
