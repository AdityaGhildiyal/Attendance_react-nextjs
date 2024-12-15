import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await client.connect();
          const db = client.db('attendanceproject');
          
          const role = credentials.role || 'student'; 
          const usersCollection = db.collection(role === 'teacher' ? 'teacher' : 'students');
          
          
          const user = await usersCollection.findOne({ email: credentials.email });

          if (user && credentials.password === user.password) {
            return { email: user.email, role }; 
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Authorization failed. Please try again.");
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', 
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.role = token.role; 
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
