import Credentials from "next-auth/providers/credentials";
import { DefaultSession, type NextAuthOptions } from "next-auth";
import { Environments, Pages, Routes } from "@/app/types/enums";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { login } from "./_actions/auth";
import { User, UserRole } from "@/lib/generated/prisma/client";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Partial<User> {
    id: string;
    username: string;
    phone: string;
    role: UserRole;
  }
}
export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.career = token.career!;
        session.user.email = token.email!;
        session.user.phone = token.phone;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.country = token.country as string;
        session.user.city = token.city as string;
        session.user.postalCode = token.postalCode as string;
        session.user.streetAddress = token.streetAddress as string;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: session.user.id,
          username: session.user.username,
          phone: session.user.phone,
          email: session.user.email,
          role: session.user.role,
        },
      };
    },
    async jwt({ token }: { token: JWT }) {
      const dbUser = await db.user.findUnique({
        where: { email: token?.email! },
      });
      if (!dbUser) return token;
      token.career = dbUser.career;
      token.email = dbUser.email;
      token.phone = dbUser.phone;
      token.username = dbUser.username;
      token.role = dbUser.role;
      token.city = dbUser.city;
      token.country = dbUser.country;
      token.postalCode = dbUser.postalCode;
      token.streetAddress = dbUser.streetAddress;
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
    updateAge: 24 * 60 * 60,
  },
  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === Environments.DEV,
  secret: process.env.SECRET,
  providers: [
    Credentials({
      name: "credentials-auth",
      credentials: {
        phone: {
          label: "phone",
          type: "text",
          placeholder: "phone",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const res = await login(credentials);
        if (res.status === 200 && res.uerWithoutPassword) {
          return res.uerWithoutPassword;
        } else {
          throw new Error(
            JSON.stringify({
              validationError: res?.error,
              responseError: res?.message!,
            })
          );
        }
      },
    }),
  ],
  pages: {
    signIn: `${Routes.AUTH}/${Pages.LOGIN}`,
  },
};
