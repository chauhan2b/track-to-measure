import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// This is a simplified auth setup for the MVP
// In a production environment, you'd want to connect to a real database
const users = [
  {
    id: "1",
    email: "demo@tracktomeasure.com",
    name: "Demo User",
    password: "password123", // In production, you'd never store plain text passwords
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For the MVP, we're using a hardcoded user list
        // In production, you'd query your database here
        const user = users.find((user) => user.email === credentials.email);

        if (!user || user.password !== credentials.password) {
          return null;
        }

        // Never return the password in the user object
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};