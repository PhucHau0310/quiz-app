import { prisma } from '../prisma';

interface UserProps {
    name: string | null;
    email: string;
    image: string | null;
}

export const addUser = async ({ name, email, image }: UserProps) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: name ?? '',
                email,
                avatar: image ?? '',
            },
        });

        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const findUserById = async (Id: string) => {
    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                id: Number(Id),
            },
        });

        return foundUser;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllUser = async () => {
    try {
        const users = await prisma.user.findMany();

        return users;
    } catch (error) {
        console.log(error);
        return error;
    }
};
