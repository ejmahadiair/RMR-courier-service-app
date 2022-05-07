import React, { useEffect, useState } from "react";
import "./dman.scss";
const Dman = () => {
  const [user, setUser] = useState([]);

  const getuser = async () => {
    const res = await fetch("http://localhost:5000/api/user/dman", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    setUser(data.muser);
  };

  useEffect(() => {
    getuser();
  }, []);
  return (
    <>
      {user.map((item, key) => {
        return (
          <div className="marchent-container" key={key}>
            <div className="block">
              <h1>{item.name}</h1>
            </div>
            <div className="block">
              <h3>{item.email}</h3>
            </div>
            <div className="block">
              <h4>{item.status}</h4>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Dman;
