"use client"; // 클라이언트 컴포넌트로 설정

import { useEffect, useState } from "react";
import axios from "axios"; // axios import

export default function Home() {
  const [data, setData] = useState<{ wr_seq?: number; wr_field_eng: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://jiles.cafe24app.com/getCustomFields");
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
      <h1>MySQL Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={item.wr_seq ?? `fallback-key-${index}`}>{item.wr_field_eng}</li>
        ))}
      </ul>
    </div>
  );
}
