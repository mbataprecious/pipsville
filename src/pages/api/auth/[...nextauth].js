import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import User from '../../../models/user.model';
import bcrypt from 'bcrypt';
import config from '../../../config/config';

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        // database look up
        const fetchedUser = await User.findOne({ email: credentials.email });
        if (fetchedUser) {
          const match = await bcrypt.compare(credentials.password, fetchedUser.password);
          if (match) {
            return fetchedUser;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user._id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
    async signIn({ user }) {
      if (user.isVerified) {
        return true;
      } else {
        console.log('send mail');
        // Return false to display a default error message
        return '/unauthorized';
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
  secret: config.jwtSecret,
  jwt: {
    secret: config.jwtSecret,
    encryption: true,
  },
  pages: {
    signIn: 'login',
  },
});
