import { addUser } from '@/lib/actions/userAction';
import NextAuth, { DefaultUser, NextAuthOptions } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';
import { NewUser } from '@/lib/interfaceType';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl;
        },

        // async jwt({ token }) {
        //     console.log('jwt token', { token });

        //     const data = await prisma.user.findFirst({
        //         where: {
        //             email: token.email ?? '',
        //         },
        //     });
        //     if (data) {
        //         return {
        //             ...token,
        //             id: data.id,
        //         };
        //     }
        //     return { ...token, id: null };
        // },

        // async session({ session, user, token }) {
        //     console.log('session callback', { session, user, token });

        //     const extendedUser: ExtendedUser = {
        //         ...session.user,
        //         id: token.id as number | null,
        //     };

        //     return {
        //         ...session,
        //         user: extendedUser,
        //     };
        // },

        async jwt({ token }) {
            // console.log('jwt token', { token });

            const data = await prisma.user.findFirst({
                where: { email: token.email ?? '' },
            });
            if (data) {
                return { ...token, id: data.id };
            }
            return { ...token, id: null };
        },
        async session({ session, token }) {
            session.user.id = token.id as number | null;
            // console.log('session callback', { session, token });
            return session;
        },

        async signIn({ user }) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: user.email ?? '',
                },
            });
            if (existingUser) {
                return true;
            } else {
                const newUser: NewUser = {
                    name: user.name ?? null,
                    email: user.email ?? '',
                    image: user.image ?? '',
                };

                await addUser(newUser);
                return true;
            }
        },
    },

    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET,
};
