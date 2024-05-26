import { findUserById } from '@/lib/actions/userAction';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { profileId: string } }
) => {
    try {
        const user = await findUserById(params.profileId);

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new NextResponse('Failed to get user by email', { status: 500 });
    }
};
