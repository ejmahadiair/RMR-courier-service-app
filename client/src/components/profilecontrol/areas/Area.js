import React, { useEffect, useState } from "react";

import { DeleteForeverOutlined } from "@material-ui/icons";
import InsertArea from "./areacontroler/insertarea/InsertArea";
import FindArea from "./areacontroler/findarea/FindArea";
import "./area.scss";
const Area = () => {
  const [inarea, setInarea] = useState(false);
  const [farea, setFarea] = useState(false);
  const [allareas, setAllarea] = useState([]);

  console.log(allareas);
  const getAllarea = async () => {
    const res = await fetch("http://localhost:5000/api/area/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setAllarea(data.citys);
    // console.log(data.citys);
  };

  useEffect(() => {
    getAllarea();
  }, []);

  const controlarea = (area) => {
    switch (area) {
      case "insert":
        setInarea(true);
        setFarea(false);
        break;
      case "findone":
        setInarea(false);
        setFarea(true);
        break;

      default:
        break;
    }
  };
  const Deletearea = async (id) => {
    const res = await fetch(`http://localhost:5000/api/area/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("get delete area: ", data);
    alert(data.message);
  };
  const deletearea = (id) => {
    Deletearea(id);
  };
  return (
    <>
      <div className="area-container">
        <div className="area-control-buttons">
          <button type="button" onClick={() => controlarea("insert")}>
            Insert New Area
          </button>
          <button type="button" onClick={() => controlarea("findone")}>
            Find spacific area
          </button>
        </div>

        <div className="area-control">
          {inarea && <InsertArea />}
          {farea && <FindArea />}
        </div>

        <div className="show-all-area">
          {allareas.map((city, k) => {
            return (
              <>
                <div className="area-box">
                  <h3 className="area-name">{city.name}</h3>

                  <h5 className="area-status">{city.status}</h5>

                  <div
                    className="delete-area"
                    onClick={() => deletearea(city._id)}
                  >
                    <DeleteForeverOutlined />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Area;
