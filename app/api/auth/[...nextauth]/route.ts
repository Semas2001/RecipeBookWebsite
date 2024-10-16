import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import Users from "@/models/Users"
import dbConnect from "@/lib/mongodb"

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        id : "credentials",
        name : "Credentials",
        credentials:{
            email:{label: "Email", type: "text"},
            password:{label: "Password", type: "password"},
        },
        async authorize(credentials:any) {
            await dbConnect();
            try{
                const user = await Users.findOne({email: credentials.email});
                if(user){
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )
                    if(isPasswordCorrect){
                        return user;
                    }
                }
            }catch(err: any){
                throw new Error(err);
            }
        }


    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID?? "",
      clientSecret: process.env.GITHUB_SECRET?? "",
    }),
    // ...add more providers here
  ],
}

export const handler = NextAuth(authOptions);
export { handler as GET,  handler as POST };

