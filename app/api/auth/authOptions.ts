import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    // Because prisma adapter is used, NextAuth will change the session
    // strategy from 'jwt' to 'database', which doesn't work with OAuth
    // providers such as Google, so here the strategy is set back to 'jwt'
    session: {
      strategy: 'jwt'
    },
  }

export default authOptions