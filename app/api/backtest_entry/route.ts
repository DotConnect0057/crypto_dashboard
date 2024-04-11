import BackTest from '../../models/backtest';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest) {
    const param = request.nextUrl.searchParams.get('id')
    try {
        const test = await BackTest.find({ _id: param })
        const result = test
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}