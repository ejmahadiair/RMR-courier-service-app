import React from "react";
import "./hadbanner.scss";
import { useNavigate } from "react-router-dom";
import { CalendarTodaySharp, PersonSharp } from "@material-ui/icons";
import Track from "./Track/Track";
const HadBanner = () => {
  const navigate = useNavigate();
  const shiping = () => {
    navigate("/ship");
  };
  const portal = () => {
    navigate("/portal");
  };

  return (
    <>
      <div className="Had-Banner-Container ">
        <div className="opacity-b">
          <div className="top">
            <Track />
          </div>
          <div className="bottom row">
            <div className="item item1 col-md-12" onClick={shiping}>
              <div>
                <div className=" items">
                  <CalendarTodaySharp className="icon" />
                </div>
                <h6 className=" items">Ship Now</h6>
                <p className=" items">Find the Right Service</p>
              </div>
            </div>

            <div className="item item2 col-md-12" onClick={portal}>
              <div>
                <div className="items">
                  <PersonSharp className="icon" />
                </div>
                <h6 className=" items">Portal Login</h6>
                <div></div>
                <p className=" items">Make your product safe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HadBanner;
