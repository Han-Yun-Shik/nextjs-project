"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Pwrite() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    wr_name: "",
    addfile1: null,
    addfile2: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("wr_name", formData.wr_name);
    if (formData.addfile1) data.append("addfile1", formData.addfile1);
    if (formData.addfile2) data.append("addfile2", formData.addfile2);

    try {
      const response = await axios.post("/api/pwrite", data);
      setMessage(response.data.message);
      router.push("/bbs/plist");
    } catch (error) {
      console.error("데이터 전송 실패:", error);
      setMessage("데이터 전송 실패");
    }
  };

  return (
    <div>
      <h1>Gallery Write</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="wr_name">이름:</label>
          <input
            type="text"
            name="wr_name"
            id="wr_name"
            onChange={handleChange} 
            className="ar_form_input"
          />
        </div>
        <div>
          <label htmlFor="addfile1">파일 1:</label>
          <input type="file" name="addfile1" id="addfile1" onChange={handleChange} className="ar_form_input" />
        </div>
        <div>
          <label htmlFor="addfile2">파일 2:</label>
          <input type="file" name="addfile2" id="addfile2" onChange={handleChange} className="ar_form_input" />
        </div>
        <button type="submit" className="ar_btn_submit">전송</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}