import BackTest from '../../models/backtest';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const test = await BackTest.aggregate([
            {
                $sort: { backtest_date: -1 }
            },
            {
                $group: {
                    _id: "$title",
                    latestDoc: { $first: "$$ROOT" },
                    uniqueIds: { $addToSet: "$_id" },
                    date: { $addToSet: "$backtest_date" },
                    count: { $sum: 1 }
                }
            },
            {
                $match: { count: { $gt: 0 } }
            }
        ]);
        const result = test
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}