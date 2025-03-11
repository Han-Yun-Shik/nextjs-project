"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Bwrite() {
  const router = useRouter();
  const [formData, setFormData] = useState({ wr_name: "", wr_email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("보낼 데이터:", formData); // ✅ 데이터 확인 로그 추가

      const res = await axios.post("/api/bwrite", formData);
      console.log("서버 응답:", res.data);
      router.push("/bbs/blist");
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <>
      <h4>글쓰기</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="wr_name">Name</label>
          <input type="text" name="wr_name" className="ar_form_input" placeholder="Enter Name" value={formData.wr_name} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label htmlFor="wr_email">Email</label>
          <input type="email" name="wr_email" className="ar_form_input" placeholder="Enter Email" value={formData.wr_email} onChange={handleChange} required />
        </div>
        <button className="ar_btn_submit">Submit</button>
      </form>
    </>
  );
}
