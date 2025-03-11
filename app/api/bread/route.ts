import { NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const wr_seq = searchParams.get("id");

    if (!wr_seq) {
      return NextResponse.json({ error: "ID 누락" }, { status: 400 });
    }

    const res = await axios.get(`${API_BASE_URL}/api/read/${wr_seq}`);
    
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("API 요청 오류:", error);
    return NextResponse.json({ error: "데이터 요청 실패" }, { status: 500 });
  }
}
