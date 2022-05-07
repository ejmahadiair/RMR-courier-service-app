import React, { useCallback, useEffect, useState } from "react";
import {} from "react-router-dom";
import "./place.scss";
const Place = ({ setIsplace }) => {
  const [incity, setIncity] = useState(true);
  const [value, setValue] = useState(" ");
  const [arrvlaue, setArrvalue] = useState("");
  const [arrvlaue2, setArrvalue2] = useState("");
  const [isweight, setIsWeight] = useState(false);
  const [weightSub, setweightSub] = useState(true);
  const [charge, setCharge] = useState(0);
  const [tost, setTost] = useState(true);

  //new job
  const [ptype, setPtype] = useState("");
  const [arearoll, setArearoll] = useState("");
  const [area, setArea] = useState([]);
  const [darea, setDarea] = useState("");

  console.log("arearoll: ", arearoll);

  const weightpart = () => {
    if (incity) {
      setCharge(30);
      if (arrvlaue === "" || arrvlaue === " ") {
        setIsWeight(false);
        setweightSub(true);
      } else {
        setIsWeight(true);
        setweightSub(false);
      }
    } else {
      setCharge(70);
      if (arrvlaue2 === "" || arrvlaue2 === " ") {
        setIsWeight(false);
        setweightSub(true);
      } else {
        setIsWeight(true);
        setweightSub(false);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setTost(false);
    }, 2000);
  }, []);

  const fdata = useCallback(async () => {
    if (incity) {
      const res = await fetch("http://localhost:5000/api/area/in", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setArea(data.inareas);
    } else {
      const res = await fetch("http://localhost:5000/api/area/out", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setArea(data.outareas);
    }
  }, [incity]);

  useEffect(() => {
    fdata();
  }, [fdata]);

  useEffect(() => {
    if (incity) {
      setDarea(arrvlaue);
    } else {
      setDarea(arrvlaue2);
    }
  }, [arrvlaue, arrvlaue2, incity]);

  const InCity = () => {
    setIncity(true);
    setArearoll("in");
  };
  const OutCity = () => {
    setIncity(false);
    setArearoll("out");
  };
  let orderSubmit;
  try {
    orderSubmit = async (e) => {
      e.preventDefault();
      const res = await fetch("http://localhost:5000/api/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: ptype,
          city: arearoll,
          area: value,
          darea: darea,
          charge: charge,
          user: localStorage.getItem("userId"),
        }),
      });
      const data = await res.json();
      console.log("dalivery order: ", data);
      alert(data.message);
    };
  } catch (e) {
    alert(
      "Some details missing please check again and fill all the filds correctly. ",
      e
    );
  }
  return (
    <>
      <div className="place-container">
        {tost && <div className="msg">You are acting as a Person</div>}

        <h1>PLACE YOUR DALIVARY</h1>
        <form onSubmit={orderSubmit}>
          <h2>Select Product Type</h2>
          <div className="product-type">
            <label for="name">Grocery</label>
            <input
              type="radio"
              name="item"
              value="Grocery"
              onChange={(e) => setPtype(e.target.value)}
            />
            <label for="name">Electronics</label>
            <input
              type="radio"
              name="item"
              value="Electronics"
              onChange={(e) => setPtype(e.target.value)}
            />
            <label for="name">Madicne</label>
            <input
              type="radio"
              name="item"
              value="Madicne"
              onChange={(e) => setPtype(e.target.value)}
            />
            <label for="name">Foods</label>
            <input
              type="radio"
              name="item"
              value="Foods"
              onChange={(e) => setPtype(e.target.value)}
            />
            <label for="name">Documents</label>
            <input
              type="radio"
              name="item"
              value="Documents"
              onChange={(e) => setPtype(e.target.value)}
            />
          </div>

          <div className="destination">
            <button type="button" onClick={InCity}>
              In City Dhaka
            </button>
            <button type="button" onClick={OutCity}>
              Out City
            </button>
          </div>
          {incity && (
            <div className="select-area">
              <h5>Select Area</h5>
              <select onChange={(e) => setValue(e.target.value)}>
                {area.map((option, key) => (
                  <option key={key} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>

              {value !== " " ? (
                <div className="incity-address">
                  <textarea
                    value={arrvlaue}
                    rows="2"
                    cols="50"
                    onChange={(e) => setArrvalue(e.target.value)}
                    placeholder={`Enter exect location like road no and house no and more of ${value}`}
                  />
                </div>
              ) : (
                " "
              )}
            </div>
          )}
          {!incity && (
            <div className="select-area">
              <h5>Select Area</h5>
              <select onChange={(e) => setValue(e.target.value)}>
                {area.map((option, key) => (
                  <option key={key} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>

              {value !== " " ? (
                <div className="incity-address">
                  <textarea
                    value={arrvlaue2}
                    rows="5"
                    cols="50"
                    onChange={(e) => setArrvalue2(e.target.value)}
                    placeholder={`Enter exect location of ${value}`}
                  />
                </div>
              ) : (
                " "
              )}
            </div>
          )}

          {isweight ? (
            <div>
              {incity ? (
                <div>Dalivery charge is : {charge}</div>
              ) : (
                <div>Dalivery charge is : {charge} </div>
              )}
            </div>
          ) : (
            <h3>{value === "" && "Please fill the exect location box"}</h3>
          )}

          <div className="buttons">
            {weightSub && (
              <button type="button" onClick={weightpart}>
                Submit
              </button>
            )}
            {!weightSub && <button type="submit">Conferm order</button>}
            <button
              type="button"
              onClick={() => setIsplace(false)}
              style={{ background: "tomato" }}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Place;
