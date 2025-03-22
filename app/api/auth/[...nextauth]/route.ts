import { connect } from "@/utils/config/dbConfig";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/Users";
import bcryptjs from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
                async authorize(credentials) {
                    const {email, password} = credentials as {
                        email:string;
                        password:string;
                    }
                    try{
                        await connect();
                        const user = await User.findOne({email});
                        if (!user) {
                            return null;
                        }
                        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
                        if(!isPasswordCorrect){
                            return null;
                        }
                        return user;
                    }catch(err){
                        console.log("error:", err);
                    }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks:{
       async jwt ({token, user}){ 
        if (user) {
            token.id = user.id;
            token.email = user.email;
            token.name = user.name;
            }
        return token;
        },
        async session({session, token}:{session:any, token:any}){
            if(session.user){
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            console.log("session:", session);
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions);
export{handler as GET, handler as POST} 
