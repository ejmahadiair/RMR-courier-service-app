import React, { useState, useEffect } from "react";
import "./order.scss";
const Order = () => {
  const [orderdetail, setOrderdetail] = useState([]);

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
  return (
    <>
      <div className="order-container">
        <div className="row">
          {/*start*/}
          {orderdetail.map((item, key) => {
            return (
              <div className="col-lg-4 item" key={key}>
                <h2>{item.type}</h2>
                <h3>{item.status}</h3>
                <h4>Place: {item.city} City</h4>
                <h5>Area: {item.area}</h5>
                <p>Details Area : {item.darea}</p>
                <h6>Paid: ${item.charge} BDD</h6>
                <div className="parmission">
                  <button type="button">Aprove</button>
                  <button type="button">Edit</button>
                  <button
                    type="button"
                    className="reject"
                    onClick={() => deleteorder(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {/*end*/}
        </div>
      </div>
    </>
  );
};

export default Order;
