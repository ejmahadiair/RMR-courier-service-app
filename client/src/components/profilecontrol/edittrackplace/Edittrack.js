import React, { useState } from "react";
import "./edittrack.scss";
const Edittrack = ({ editid }) => {
  const [address, setAddress] = useState("");
  const updatetrack = async () => {
    const res = await fetch(`http://localhost:5000/api/order/track/${editid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        track: address,
      }),
    });
    const data = await res.json();
    console.log("update track: ", data);
    alert(data.message);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updatetrack();
  };
  return (
    <>
      <div className="track-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={address}
            placeholder="Inter your current location address with details. "
            onChange={(e) => setAddress(e.target.value)}
          />

          <button type="submit">Update Address</button>
        </form>
      </div>
    </>
  );
};

export default Edittrack;
