import React from "react";
import "../header/header.scss";
import Had from "./hade/Had";
import Nav from "./nav/Nav";
const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="top">
          <Had />
        </div>
        <div className="bottom">
          <Nav />
        </div>
      </div>
    </>
  );
};

export default Header;
