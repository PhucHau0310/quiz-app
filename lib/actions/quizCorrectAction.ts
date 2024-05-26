import { prisma } from '@/lib/prisma';

export const getAllQuizCorrect = async () => {
    try {
        const quizzesCorrect = await prisma.quizCorrect.findMany({
            include: {
                correctAnswer: true,
            },
        });

        return quizzesCorrect;
    } catch (error) {
        console.log(error);
        return error;
    }
};
