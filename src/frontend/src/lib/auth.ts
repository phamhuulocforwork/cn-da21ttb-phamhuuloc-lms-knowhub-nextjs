import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { login } from "~/actions/auth/login";
import { getServerSession } from "next-auth/next";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: profile.email,
              name: profile.name,
              image: profile.picture,
            }),
          },
        );

        const data = await response.json();

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image,
          role: data.user.role,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const response = await login({
          email: credentials.email,
          password: credentials.password,
        });

        if (!response.success) {
          return null;
        }

        return {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          image: response.user.image,
          role: response.user.role,
          error: response.error,
          success: response.success,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          image: token.image as string,
          provider: token.provider as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      provider: string;
      role: string;
    };
  }
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    provider?: string;
  }
}

export const auth = () => getServerSession(authOptions);
