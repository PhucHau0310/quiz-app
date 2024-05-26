import { getAllQuizCorrect } from '@/lib/actions/quizCorrectAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const allQuizzesCorrect = await getAllQuizCorrect();
        return new NextResponse(JSON.stringify(allQuizzesCorrect), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to get all quizzes correct', {
            status: 500,
        });
    }
};
