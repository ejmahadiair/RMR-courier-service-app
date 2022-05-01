import React from "react";
import "./dashboard.scss";
const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <div className="row">
          <div className="col-lg-3 items">
            <h3>Total Earning</h3>
            <div className="item">
              <div className="item-left">image</div>
              <div className="item-right">amount</div>
            </div>
          </div>
          <div className="col-lg-3 items">
            <h3>Total Dalivery</h3>
            <div className="item">
              <div className="item-left">image</div>
              <div className="item-right">amount</div>
            </div>
          </div>
          <div className="col-lg-3 items">
            <h3>Total Marchent</h3>
            <div className="item">
              <div className="item-left">image</div>
              <div className="item-right">amount</div>
            </div>
          </div>
          <div className="col-lg-3 items">
            <h3>Total Dalivery Man</h3>
            <div className="item">
              <div className="item-left">image</div>
              <div className="item-right">amount</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
