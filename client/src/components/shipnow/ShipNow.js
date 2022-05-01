import React, { useState } from "react";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import "./shipnow.scss";
import Place from "../placement/Place";

const ShipNow = () => {
  const [isplace, setIsplace] = useState(false);
  return (
    <>
      <div className="ship-now-container">
        <Header />
        <div className="shop-now-container">
          <h1 className="title">SHIP NOW</h1>
          <p className="ship-des">
            In order to get you to the right tool or expert in RMR, we need to
            ask you a few short questions.
          </p>

          {!isplace && (
            <div>
              <p style={{ marginTop: 20 }}>I,am</p>
              <div className="who">
                <div className="left">
                  <button type="button" onClick={() => setIsplace(true)}>
                    As a Person
                  </button>
                </div>
                <div className="right">
                  <button type="button">
                    <Link to="/portal" className="link">
                      As a Marchent/Company
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {isplace && (
          <div>
            <Place setIsplace={setIsplace} />
          </div>
        )}
      </div>
    </>
  );
};

export default ShipNow;
