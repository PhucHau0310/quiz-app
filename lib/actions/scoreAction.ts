import { prisma } from '@/lib/prisma';

export const addScoreQuiz = async (userId: string, score: number) => {
    try {
        const scoreResult = await prisma.score.create({
            data: {
                userId: Number(userId),
                score: score,
            },
        });

        return scoreResult;
    } catch (error) {
        console.log(error);
        return error;
    }
};
