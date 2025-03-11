import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const wr_seq = searchParams.get("id");

    if (!wr_seq) {
      return NextResponse.json({ error: "ID 누락" }, { status: 400 });
    }

    const res = await axios.get(`http://arumcnc7.cafe24app.com/api/read/${wr_seq}`);
    
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("API 요청 오류:", error);
    return NextResponse.json({ error: "데이터 요청 실패" }, { status: 500 });
  }
}
