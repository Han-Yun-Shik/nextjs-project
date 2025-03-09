import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get("http://arumcnc7.cafe24app.com/blist");
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({ error: "데이터 요청 실패" }, { status: 500 });
  }
}
