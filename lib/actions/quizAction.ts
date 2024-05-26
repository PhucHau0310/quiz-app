import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface AnswerProps {
    text: string;
    isCorrect: boolean;
}

interface QuizProps {
    question: string;
    answers: AnswerProps[];
}

export const addQuiz = async (quizData: QuizProps) => {
    const { question, answers } = quizData;

    try {
        // Create the quiz with associated answers
        const quiz = await prisma.quiz.create({
            data: {
                question,
                answers: {
                    create: answers.map((answer) => ({
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                    })),
                },
            },
            include: {
                answers: true, // Include answers in the result
            },
        });

        // Find the correct answer from the created answers
        const correctAnswer = quiz.answers.find((answer) => answer.isCorrect);

        // Create the QuizCorrect relation if a correct answer exists
        if (correctAnswer) {
            await prisma.quizCorrect.create({
                data: {
                    quizId: quiz.id,
                    correctAnswerId: correctAnswer.id,
                },
            });
        }

        return quiz;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const getQuizById = async (quizId: string) => {
    try {
        const foundQuiz = await prisma.quiz.findFirst({
            where: {
                id: Number(quizId),
            },
            include: {
                answers: true,
            },
        });

        return foundQuiz;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getQuizzes = async () => {
    try {
        const foundQuiz = await prisma.quiz.findMany({
            include: {
                answers: true,
            },
        });

        return foundQuiz;
    } catch (error) {
        console.log(error);
        return error;
    }
};
