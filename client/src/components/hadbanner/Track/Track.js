import React from "react";
import "./track.scss";
const Track = () => {
  return (
    <>
      <div>
        <div className="tracker">
          <h2>Track Your Shipment</h2>
          <form>
            <input
              type="text"
              name=""
              value=""
              placeholder="Enter your order Id"
            />
            <button type="button" className="">
              Track
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Track;
