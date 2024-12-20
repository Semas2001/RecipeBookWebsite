import NextAuth from "next-auth"
import { Account, User as AuthUser, Session } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import Users from "@/models/Users"
import dbConnect from "@/lib/mongodb"
import { JWT } from "next-auth/jwt";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await dbConnect();
        console.log("Attempting to authenticate:", credentials.email);
      
        try {
          const user = await Users.findOne({ email: credentials.email });
          if (!user) {
            console.log("No user found with this email:", credentials.email);
            return null;
          }
      
          console.log("User found:", user);
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
      
          if (isPasswordCorrect) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name || "Unnamed User",
            };
          } else {
            console.log("Incorrect password for email:", credentials.email);
          }
        } catch (err: any) {
          console.log("Error during authentication:", err);
          throw new Error(err);
        }
        return null; // Authentication failed
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: AuthUser }) {
      if (user) {
        token.id = user.id.toString();
        token.name = user.name || "Unnamed User"; 
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user && token?.id) {
        session.user.id = token.sub as string;
        session.user.name = token.name;
      }
      return session;
    },
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "github") {
        await dbConnect();
        try {
          const existingUser = await Users.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new Users({
              email: user.email,
              name: user.name || "GitHub User", 
            });
            await newUser.save();
          }
          return true;
        } catch (err: any) {
          console.log("Error saving user", err);
          return false;
        }
      }
      return true;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET, // Secure your NextAuth
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
