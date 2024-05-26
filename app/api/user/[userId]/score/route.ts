import { addScoreQuiz } from '@/lib/actions/scoreAction';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsScore {
    userId: string;
    score: number;
}

export const POST = async (req: NextRequest) => {
    try {
        const { userId, score }: ParamsScore = await req.json();

        const scoreRes = await addScoreQuiz(userId, score);

        return new NextResponse(JSON.stringify(scoreRes), { status: 200 });
    } catch (error) {
        console.log('Error:', error);
        return new NextResponse('Failed to post score', { status: 500 });
    }
};
