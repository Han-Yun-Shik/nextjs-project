import { NextResponse } from "next/server";
import axios from "axios";

export async function PUT(req: Request) {
  try {
    const { wr_seq, wr_name, wr_email } = await req.json();
    console.log("전송 데이터:", { wr_seq, wr_name, wr_email });

    const res = await axios.put(`http://arumcnc7.cafe24app.com/api/update/${wr_seq}`, {
      wr_name,
      wr_email,
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("API 요청 오류:", error);
    return NextResponse.json({ error: "데이터 전송 실패" }, { status: 500 });
  }
}
