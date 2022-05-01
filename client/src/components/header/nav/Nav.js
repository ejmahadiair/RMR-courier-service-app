import React, { useState } from "react";
import { SearchOutlined, Style } from "@material-ui/icons";
import "./nav.scss";
import { useNavigate } from "react-router-dom";
import Track from "../../hadbanner/Track/Track";
const Nav = () => {
  const [istrack, setIstrack] = useState(false);
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };
  const track = () => {
    setIstrack(!istrack);
  };
  return (
    <>
      <div className="nav-container d-flex justify-content-between">
        <div className="left">
          <h2 onClick={home}>
            <i>RMR_ _</i>
          </h2>
        </div>
        <div className="center">
          <ul className="d-flex ">
            <li>
              <a onClick={track}>Track</a>
            </li>
            <li>
              <a href="#">Products&Solutions</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Creers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
          {istrack && (
            <div className="main-track">
              <div className={istrack && "track track-effect"}>
                <Track />
              </div>
            </div>
          )}
        </div>
        <div className="right">
          <div className="search">
            <SearchOutlined />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
