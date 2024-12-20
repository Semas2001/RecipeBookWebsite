// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; 
    name: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string; // Ensure the session user has the id property
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
