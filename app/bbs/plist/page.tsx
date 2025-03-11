"use client";



export default function Plist() {
  const imageUrl = encodeURIComponent(
    "http://arumcnc7.cafe24app.com/home/hosting_users/arumcnc7/apps/arumcnc7_arumcnc7/uploads/1741674653887-548438850.jpg"
  );

  return (
    <div>
      <h1>Gallery List</h1>
      <img src={`/api/image-proxy?url=${imageUrl}`} alt="Gallery Image" />
    </div>
  );
}
