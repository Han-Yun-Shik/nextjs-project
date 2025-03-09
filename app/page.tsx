"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState<{ wr_seq?: number; wr_name: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/proxy"); // Next.js API 경유
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("데이터 형식이 올바르지 않습니다:", res.data);
        }
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>MySQL Data3</h1>
      <ul>
        {data.map((item, index) => (
          <li key={item.wr_seq ?? `fallback-key-${index}`}>{item.wr_name}</li>
        ))}
      </ul>
    </div>
  );
}
