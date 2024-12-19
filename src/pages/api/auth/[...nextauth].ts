import NextAuth, { DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      name?: string | null;
      first_name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string; // Add the token property here
      loginTime?: string; // Add loginTime to the session
    } & DefaultUser;
    loginTime?: string; // Optional at the session level
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Otp", type: "text" },
      },
      async authorize(credentials: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/auth/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            otp: credentials.otp,
          }),
        });
        const user = await res.json();

        if (!res.ok) {
          throw new Error(user?.message || 'Invalid credentials');
        }

        if (user?.result) {
          return {
            id: user?.result?.id,
            _id: user?.result?.id,
            role: user?.result?.role,
            email: user?.result?.email,
            token: user?.result?.access_token,
            user: user?.result,
            loginTime: new Date().toISOString(), // Add login time when the user is authorized
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
        token.token = user.token;
        token.loginTime = user.loginTime; // Store login time in JWT token
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user;
        session.token = token.token;
        session.loginTime = token.loginTime; // Store login time in session
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/login?error=true',
  },
  secret: "acha",
});
