"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001";

export default function Plist() {
  const imageUrl = encodeURIComponent(
    `${API_BASE_URL}/home/hosting_users/arumcnc7/apps/arumcnc7_arumcnc7/uploads/1741674653887-548438850.jpg`
  );

  return (
    <div>
      <h1>Gallery List</h1>
      <img src={`/api/image-proxy?url=${imageUrl}`} alt="Gallery Image" />
    </div>
  );
}
