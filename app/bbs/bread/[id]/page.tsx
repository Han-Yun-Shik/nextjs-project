"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Bread() {
  const { id } = useParams(); // URL에서 id 가져오기
  const [data, setData] = useState<{ wr_name: string; wr_email: string } | null>(null);

  // ✅ 기존 데이터 불러오기
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/bread?id=${id}`); // API 경유해서 데이터 가져오기
        setData(res.data);
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
      }
    }
    if (id) fetchData();
  }, [id]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h4>글 상세보기</h4>
      <div className="mb-2">
        <label>Name:</label> {data.wr_name}
      </div>
      <div className="mb-2">
        <label>Email:</label> {data.wr_email}
      </div>
    </>
  );
}
