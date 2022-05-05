import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./track.scss";
const Track = () => {
  const [tid, setIid] = useState("");
  const navigate = useNavigate();
  const gettid = () => {
    localStorage.setItem("tid", tid);
    navigate("/track");
  };
  return (
    <>
      <div>
        <div className="tracker">
          <h2>Track Your Shipment</h2>
          <form>
            <input
              type="text"
              name=""
              value={tid}
              placeholder="Enter your order Id"
              onChange={(e) => setIid(e.target.value)}
            />

            <button type="button" className="button" onClick={gettid}>
              Track
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Track;
