"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Blist() {
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

    const handleDelete = async (wr_seq?: number) => {
        if (!wr_seq) return;
        
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
    
        try {
            const res = await axios.delete(`/api/bdelete?id=${wr_seq}`);
            if (res.status === 200) {
                alert("삭제되었습니다.");
                setData(prevData => prevData.filter(item => item.wr_seq !== wr_seq)); // 화면에서 즉시 제거
            } else {
                alert("삭제 실패");
            }
        } catch (error) {
            console.error("삭제 오류:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };
    

    return (
        <div>
            <h1>글목록</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={item.wr_seq ?? `fallback-key-${index}`} className="ar_li_wrap">
                        {item.wr_name}
                        <Link href={`/bbs/bedit/${item.wr_seq}`} className="ar_btn_submit">Edit</Link>
                        <Link href={`/bbs/bread/${item.wr_seq}`} className="ar_btn_submit">Read</Link>
                        <button onClick={() => handleDelete(item.wr_seq)} className="ar_btn_submit">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
