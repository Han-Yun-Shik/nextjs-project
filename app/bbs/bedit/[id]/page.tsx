"use client";

import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Bedit() {
  const router = useRouter();
  const { id } = useParams(); // URL에서 id 가져오기
  const [formData, setFormData] = useState({ wr_name: "", wr_email: "" });

  // ✅ 기존 데이터 불러오기
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/bread?id=${id}`); // API 경유해서 데이터 가져오기
        setFormData({ wr_name: res.data.wr_name, wr_email: res.data.wr_email });
      } catch (error) {
        console.error("데이터 불러오기 오류:", error);
      }
    }
    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("수정 데이터:", formData);
      await axios.put(`/api/bedit`, { wr_seq: id, ...formData });
      router.push("/bbs/blist");
    } catch (error) {
      console.error("수정 오류:", error);
    }
  };

  return (
    <>
      <h4>글 수정</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="wr_name">Name</label>
          <input type="text" name="wr_name" className="ar_form_input" placeholder="Enter Name" value={formData.wr_name} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label htmlFor="wr_email">Email</label>
          <input type="email" name="wr_email" className="ar_form_input" placeholder="Enter Email" value={formData.wr_email} onChange={handleChange} required />
        </div>
        <button className="ar_btn_submit">Update</button>
      </form>
    </>
  );
}
