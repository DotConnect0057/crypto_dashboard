import BackTest from "../../models/backtest";
import { NextRequest, NextResponse } from "next/server";

// This api returns backtest information given mongodb unique id "_id".

export async function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("title");
  try {
    const test = await BackTest.find({ title: param }).select({
      _id: 1,
      strategy_id: 1,
      title: 1,
    });
    // console.log(test)

    //   const result = { _id: test._id, strategy_id: test.strategy_id, title: test.title }
    const result = test;

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
