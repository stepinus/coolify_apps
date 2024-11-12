import NextAuth, { DefaultSession, DefaultUser, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

// Расширяем JWT, чтобы включить поля пользователя
interface ExtendedJWT extends JWT {
  id: string;
  name: string;
}

// Расширяем типы для пользователя
interface User extends DefaultUser {
  id: string;
  name: string;
}

// Расширяем типы для сессии
interface Session extends DefaultSession {
  user: User;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password", placeholder: "your_secure_password" }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          return null;
        }
        const { username, password } = credentials;
        if (username === 'admin' && password === 'Leshiy##1') {
          return { id: '1', name: 'Admin' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
        },
      };
    },
    async jwt({ token, user }): Promise<ExtendedJWT> {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token as ExtendedJWT;
    }
  }
};

export default NextAuth(authOptions);
