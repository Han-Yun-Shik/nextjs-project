import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("전송 데이터:", body); // ✅ 데이터 확인 로그 추가

    const res = await axios.post("http://arumcnc7.cafe24app.com/api/bwrite", body);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("API 요청 오류:", error);
    return NextResponse.json({ error: "데이터 전송 실패" }, { status: 500 });
  }
}
