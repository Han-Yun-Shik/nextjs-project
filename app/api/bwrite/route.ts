import { NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("전송 데이터:", body); // ✅ 데이터 확인 로그 추가

    const res = await axios.post(`${API_BASE_URL}/api/bwrite`, body);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("API 요청 오류:", error);
    return NextResponse.json({ error: "데이터 전송 실패" }, { status: 500 });
  }
}
