import React, { useEffect, useState } from "react";
import Nav from "../header/nav/Nav";
import "./trackdetails.scss";
const Trackdetails = () => {
  const [trackdetails, setTrackdetails] = useState("");
  const [orderstatus, setOrderstatus] = useState("");

  const getorderbyid = async () => {
    const res = await fetch("http://localhost:5000/api/order/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: localStorage.getItem("tid"),
      }),
    });
    const data = await res.json();
    // console.log("order user: ", data.user);
    setOrderstatus(data.singleorder.status);
  };
  useEffect(() => {
    getorderbyid();
  }, []);
  const gettrack = async () => {
    const res = await fetch("http://localhost:5000/api/order/id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: localStorage.getItem("tid") }),
    });
    const data = await res.json();
    setTrackdetails(data.singleorder.track);
  };
  useEffect(() => {
    gettrack();
  }, []);
  console.log(trackdetails);
  const gotit = async () => {
    await fetch(
      `http://localhost:5000/api/order/aprove/${localStorage.getItem("tid")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "complet",
        }),
      }
    );
  };
  const updatetrack = async () => {
    await fetch(
      `http://localhost:5000/api/order/track/${localStorage.getItem("tid")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          track:
            "The dalivery has completed and this dalivery record will be remove with in few days. If you want to save this dalivery history then please contant with chif Developer (Eftakhar Jaman) ejmahadiair@gmail.com/+8801642167361",
        }),
      }
    );
    // const data = await res.json();
    // console.log("update track: ", data);
    // alert(data.message);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    gotit();
    updatetrack();
    if (orderstatus) {
      alert("Thank you for paitent. We hope your product is safe and secure.");
    } else {
      alert("Make sure your dalivery or order Id");
    }
  };
  return (
    <>
      <div className="track-container">
        <Nav />
        <div className="track-box">
          <h1>Track Details:</h1>
          <h3>{trackdetails}</h3>
        </div>
        {orderstatus === "ongoing" && (
          <form onSubmit={handlesubmit}>
            <button type="submit">Got It</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Trackdetails;
