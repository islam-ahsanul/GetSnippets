import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';
import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session?.user?.email) {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }

      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      try {
        if (!profile?.email) {
          return false; // profile or profile.email is undefined
        }

        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          console.log(profile);
          await User.create({
            email: profile.email,
            name: profile.name,
            username: profile.name?.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error('Error during sign-in process:', error);
        return false;
      }
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
