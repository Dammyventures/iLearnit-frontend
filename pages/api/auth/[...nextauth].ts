import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  // OPTIMIZED SESSION SETTINGS (JWT strategy)
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        domain: '.ilearnit.vercel.app'
      }
    }
  },
  
  // OPTIMIZED CALLBACKS (minimal data)
  callbacks: {
    async session({ session, token }) {
      // Only store essential data - ID only
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Minimal JWT data
      if (user) {
        (token as any).id = user.id;
      }
      return token;
    }
  }
};

export default NextAuth(authOptions);