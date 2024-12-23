import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "~/actions/login";

export const authOptions: NextAuthOptions = {
  providers: [
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
          error: response.error,
          success: response.success,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name as string,
        email: token.email as string,
        image: token.image as string,
      };
      return session;
    },
  },
};
