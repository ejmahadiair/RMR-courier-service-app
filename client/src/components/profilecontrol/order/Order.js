import React, { useState, useEffect } from "react";
import Editorder from "../editorder/Editorder";
import Edittrack from "../edittrackplace/Edittrack";
import "./order.scss";
const Order = () => {
  const [orderdetail, setOrderdetail] = useState([]);
  const [myorder, setMyorder] = useState(false);
  const [editid, setEditid] = useState("");
  const [userstatus, setUserstatus] = useState("");
  const [track, setTrack] = useState(false);

  const getuserbyid = async () => {
    const res = await fetch("http://localhost:5000/api/user/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: localStorage.getItem("userId"),
      }),
    });
    const data = await res.json();
    console.log("order user: ", data.user);
    setUserstatus(data.user.status);
  };
  useEffect(() => {
    getuserbyid();
  }, []);

  const getorderdetail = async () => {
    const res = await fetch("http://localhost:5000/api/order/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log("order Data: ", data);
    setOrderdetail(data.orders);
  };

  useEffect(() => {
    getorderdetail();
  }, []);
  //delete spacific orders
  const Deleteorder = async (id) => {
    const res = await fetch(`http://localhost:5000/api/order/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log("area deleted order: ", data);
    alert(data.message);
  };
  const deleteorder = (id) => {
    Deleteorder(id);
  };
  //aprove orders
  const Aproveorder = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/order/aprove/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });
    const data = await res.json();
    // console.log("aprove order: ", data);
    if (data.order.status === "process") {
    }
  };
  const aproveorder = (id) => {
    if (userstatus === "admin") {
      Aproveorder(id, "process");
      alert("Order on process");
    } else {
      Aproveorder(id, "ongoing");
      alert("Order on going");
    }
  };

  const editorder = (id) => {
    setMyorder(true);
    setEditid(id);
  };
  const edittrack = (id) => {
    setTrack(true);
    setEditid(id);
  };
  return (
    <>
      <div className="order-container">
        {!myorder && !track && (
          <div className="row">
            {/*start*/}
            {orderdetail.map((item, key) => {
              return (
                <div className="col-lg-4 item" key={key}>
                  <h2>{item.type}</h2>
                  <h3>{item.status}</h3>
                  <h4>Place: {item.city} City</h4>
                  <h5>Area: {item.area}</h5>
                  <h6>Order id: {item._id}</h6>
                  <p>Details Area : {item.darea}</p>
                  <h6>Paid: ${item.charge} BDD</h6>
                  {userstatus === "admin" && (
                    <div className="parmission">
                      {item.status === "panding" && (
                        <button
                          type="button"
                          onClick={() => aproveorder(item._id)}
                        >
                          Aprove
                        </button>
                      )}
                      {item.status === "process" && (
                        <button
                          type="button"
                          onClick={() => editorder(item._id)}
                        >
                          Edit
                        </button>
                      )}

                      <button
                        type="button"
                        className="reject"
                        onClick={() => deleteorder(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {userstatus === "dman" && (
                    <div className="parmission">
                      {item.status === "process" && (
                        <button
                          type="button"
                          onClick={() => aproveorder(item._id)}
                        >
                          Receve
                        </button>
                      )}
                      {item.status === "ongoing" && (
                        <button
                          type="button"
                          onClick={() => edittrack(item._id)}
                        >
                          Ensure current location
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {/*end*/}
          </div>
        )}
        {myorder && <Editorder setMyorder={setMyorder} editid={editid} />}
        {track && <Edittrack setTrack={setTrack} editid={editid} />}
      </div>
    </>
  );
};

export default Order;
