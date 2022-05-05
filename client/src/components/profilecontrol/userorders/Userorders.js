import React, { useCallback, useEffect, useState } from "react";
import Editorder from "../editorder/Editorder";
import "./userorders.scss";
const Userorders = () => {
  const [orders, setOrders] = useState([]);
  const id = localStorage.getItem("userId");
  const [myorder, setMyorder] = useState(false);
  const [editid, setEditid] = useState("");
  const getorders = useCallback(async () => {
    const res = await fetch(`http://localhost:5000/api/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log("User order by Id: ", data.userOrders.order);
    setOrders(data.userOrders.order);
  }, [id]);
  useEffect(() => {
    getorders();
  }, [getorders]);

  const Deleteorder = async (id) => {
    const res = await fetch(`http://localhost:5000/api/order/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("area deleted order: ", data);
    alert(data.message);
  };
  const deleteorder = (id) => {
    Deleteorder(id);
  };
  const editorder = (id) => {
    setMyorder(true);
    setEditid(id);
  };
  return (
    <>
      <div>
        <div className="user-order-container">
          {!myorder && (
            <div className="row">
              {/*start*/}
              {orders.map((item, key) => {
                return (
                  <div className="col-lg-4 item" key={key}>
                    <h2>{item.type}</h2>
                    <h3>{item.status}</h3>
                    <h4>Place: {item.city} City</h4>
                    <h5>Area: {item.area}</h5>
                    <h6>Order Id: {item._id}</h6>
                    <p>Details Area : {item.darea}</p>
                    <h6>Paid: ${item.charge} BDD</h6>
                    <div className="parmission">
                      {item.status === "panding" && (
                        <>
                          <button
                            type="button"
                            onClick={() => editorder(item._id)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="reject"
                            onClick={() => deleteorder(item._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              {/*end*/}
            </div>
          )}
          {myorder && <Editorder setMyorder={setMyorder} editid={editid} />}
        </div>
      </div>
    </>
  );
};

export default Userorders;
