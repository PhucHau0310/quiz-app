import { getQuizzes } from '@/lib/actions/quizAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const quizzes = await getQuizzes();
        return new NextResponse(JSON.stringify(quizzes), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to get all quizzes', { status: 500 });
    }
};
