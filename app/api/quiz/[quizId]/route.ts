import { getQuizById } from '@/lib/actions/quizAction';
import { NextResponse } from 'next/server';

export const GET = async (
    req: any,
    { params }: { params: { quizId: string } }
) => {
    try {
        const quiz = await getQuizById(params.quizId);
        return new NextResponse(JSON.stringify(quiz), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to get quiz by id', { status: 500 });
    }
};
