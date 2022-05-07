import React, { useState } from "react";
import "./insertarea.scss";
const InsertArea = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const [areadata, setAreadata] = useState([]);

  const NewArea = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/area/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        status,
      }),
    });
    const data = await res.json();
    setAreadata(data);
    // console.log("area: ", data);
    alert(data.message);
  };
  return (
    <>
      <div className="insert-area-container">
        <form onSubmit={NewArea}>
          <input
            className="insert-area"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new area name"
          />
          <div className="seletc-status">
            <div className="incity">
              <label for="name">In City</label>{" "}
              <input
                type="radio"
                name="area"
                value="in"
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="outcity">
              <label for="name">Out City</label>{" "}
              <input
                type="radio"
                name="area"
                value="out"
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Insert New Area</button>
        </form>
      </div>
    </>
  );
};

export default InsertArea;
