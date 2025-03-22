'use client';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import {signIn, useSession}  from 'next-auth/react';
import { useState, useEffect } from 'react';

export const Form = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const {data:session, status: sessionStatus} = useSession();

  useEffect(()=>{
    if(sessionStatus === "authenticated"){
        router.replace("/")
    }
  }, [sessionStatus ,router])

  const handleSubmit = async(e:any) =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    

    if(!password || password.length < 8) {
        setError("password is invalid")
        return;
    }

    const res = signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        });

    if (res?.error) {
        setError("Invalid email or password");
        if(res?.url) router.replace('/');
        }else{
            setError("")
        }
    }

    if (sessionStatus === "loading"){
        return <h1> Loading...</h1>;
    }
return (
    sessionStatus !== "authenticated" && (
 
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
    {error && <Alert>{error}</Alert>}
        <div className="w-full">
            <Button className="w-full bg-[#cfbfa7] text-black py-2 rounded-lg hover:bg-[#e4d5b7] mb-3" size="lg">
            Login
            </Button>
        </div>
    </form>
    )

  )
};
