import { getAllUser } from '@/lib/actions/userAction';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const users = await getAllUser();

        return new NextResponse(JSON.stringify(users));
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to get all user', { status: 500 });
    }
};
