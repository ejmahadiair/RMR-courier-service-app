import React, { useCallback, useEffect, useState } from "react";
import "./userorders.scss";
const Userorders = () => {
  const [orders, setOrders] = useState([]);
  const id = localStorage.getItem("userId");
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
  return (
    <>
      <div>
        <div className="user-order-container">
          <div className="row">
            {/*start*/}
            {orders.map((item, key) => {
              return (
                <div className="col-lg-4 item" key={key}>
                  <h2>{item.type}</h2>
                  <h3>{item.status}</h3>
                  <h4>Place: {item.city} City</h4>
                  <h5>Area: {item.area}</h5>
                  <p>Details Area : {item.darea}</p>
                  <h6>Paid: ${item.charge} BDD</h6>
                  <div className="parmission">
                    <button type="button">Edit</button>
                    <button type="button" className="reject">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}

            {/*end*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default Userorders;
