import React, { useState } from "react";
import { DeleteForeverOutlined } from "@material-ui/icons";
import "./findarea.scss";
const FindArea = () => {
  const [name, setName] = useState("");
  const [sname, setSname] = useState("");
  const [sstatus, setSstatus] = useState("");
  // console.log(sname);
  const getName = async () => {
    const res = await fetch("http://localhost:5000/api/area/city", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const data = await res.json();
    setSname(data.name);
    setSstatus(data.status);
    // console.log("find area: ", data);
    alert(data.message);
  };
  const findarea = (e) => {
    e.preventDefault();
    getName();
  };
  const deletecity = async () => {
    const res = await fetch("http://localhost:5000/api/area/city", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const data = await res.json();
    // console.log("area delete ", data);
    alert(data.message);
  };
  return (
    <>
      <div className="find-area-container">
        <form className="find-area-box" onSubmit={findarea}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the area name"
          />
          <button type="submit">Search</button>
        </form>
        <div className="show-area-box">
          <h3>{sname}</h3>
          <h5>{sstatus}</h5>
          <div className="delete-area" onClick={deletecity}>
            <DeleteForeverOutlined />
          </div>
        </div>
      </div>
    </>
  );
};

export default FindArea;
