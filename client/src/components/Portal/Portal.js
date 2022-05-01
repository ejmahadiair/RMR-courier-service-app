import React, { useState } from "react";
import { VisibilitySharp, VisibilityOffSharp } from "@material-ui/icons";
import "./portal.scss";
import Nav from "../header/nav/Nav";
import { useNavigate } from "react-router-dom";

const Portal = ({ portaltoapp }) => {
  const [istrue, setIstrue] = useState(true);
  const [visible, setVisible] = useState(false);
  const [userdata, setUserData] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
  });

  const handlerChange = (e) => {
    setInput((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (istrue) {
      try {
        const response = await fetch("http://localhost:5000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            password: input.password,
          }),
        });
        const data = await response.json();
        localStorage.setItem("userId", data.user._id);
        setUserData(data);
        portaltoapp(data);
        alert("login successfull");
        navigate("/profile");
      } catch (e) {
        alert("authentication problem.  ", e);
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: input.name,
            email: input.email,
            password: input.password,
          }),
        });
        const data = await response.json();
        setUserData(data.user);
        navigate("/portal");
        if (data.exist) {
          alert(data.exist);
        } else {
          alert("registration seccessfull login please");
        }
      } catch (e) {
        alert("Regisration faild. ", e);
      }
    }
  }
  console.log("user: ", userdata);

  return (
    <>
      <div>
        <Nav />
      </div>
      <div className="main-portal-container">
        <div className="portal-container">
          <div className="option">
            <h1 onClick={() => setIstrue(true)}>LOGIN</h1>
            <h1 onClick={() => setIstrue(false)}>REGISTER</h1>
          </div>
          <form onSubmit={handleSubmit}>
            {!istrue && (
              <input
                name="name"
                type="text"
                value={input.name}
                placeholder="Enter Name"
                onChange={handlerChange}
              />
            )}
            <input
              name="email"
              type="email"
              value={input.email}
              placeholder="Enter Email"
              onChange={handlerChange}
            />
            <span className="input-pass">
              <input
                name="password"
                type={visible ? "text" : "password"}
                value={input.password}
                placeholder="Enter password"
                onChange={handlerChange}
              />
              <div onClick={() => setVisible(!visible)}>
                {visible ? <VisibilitySharp /> : <VisibilityOffSharp />}
              </div>
            </span>

            <button type="submit">{istrue ? "LogIn" : "Register"}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Portal;
