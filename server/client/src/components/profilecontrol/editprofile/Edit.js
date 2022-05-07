import React, { useCallback, useEffect, useState } from "react";

import "./edit.scss";
const Edit = ({ userId, hasid }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  console.log("Edit user me: ", userId);
  console.log("Edit user has me: ", hasid);
  //get default items first for edit
  const getuserbyid1 = useCallback(async () => {
    const res = await fetch("http://localhost:5000/api/user/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    const data = await res.json();
    console.log("spacific user: ", data);
    setName(data.user.name);
    setEmail(data.user.email);
  }, [userId]);
  const getuserbyid2 = useCallback(async () => {
    const res = await fetch("http://localhost:5000/api/user/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: hasid,
      }),
    });
    const data = await res.json();
    console.log("spacific user: ", data);
    setName(data.user.name);
    setEmail(data.user.email);
  }, [hasid]);

  useEffect(() => {
    if (!userId) {
      getuserbyid2();
      setId(hasid);
    } else {
      getuserbyid1();
      setId(userId);
    }
  }, [hasid, userId, getuserbyid1, getuserbyid2]);

  const Updateuser = async () => {
    // const id = localStorage.getItem("userId");
    const res = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
    const data = await res.json();
    console.log("updated data: ", data);
    alert(data.message);
  };

  const updateuser = (e) => {
    e.preventDefault();
    Updateuser();
  };

  return (
    <>
      <div className="edit-container">
        <div className="edit">
          <h1>Edit and Update your profile</h1>
          <form onSubmit={updateuser}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter New Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter New Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
