import { NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001";

export async function GET() {
  try {
    const res = await axios.get(`${API_BASE_URL}/blist`);
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({ error: "데이터 요청 실패" }, { status: 500 });
  }
}
