import { addQuiz } from '@/lib/actions/quizAction';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: any) => {
    try {
        const dataQuiz = await req.json();
        const newQuiz = await addQuiz(dataQuiz);

        return new NextResponse(JSON.stringify(newQuiz), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to add new quiz', { status: 500 });
    }
};
