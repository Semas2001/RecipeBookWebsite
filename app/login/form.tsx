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
            {/*<Button className="w-full bg-black text-white py-2 rounded-lg hover:bg-white-900" size="lg" onClick={()=> {signIn("github")}}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg> Sign in with Github
            </Button>*/}
        </div>
    </form>
    )

  )
};
