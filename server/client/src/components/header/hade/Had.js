import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./had.scss";
const Had = () => {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  return (
    <>
      <div className="had-container d-flex">
        <div className="left">
          <h1 onClick={home}>RMR_ _</h1>
        </div>
        <div className="right">
          <ul className="d-flex">
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <Link to="/portal">Portal Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Had;
