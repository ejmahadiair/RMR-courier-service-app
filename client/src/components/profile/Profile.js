import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Place from "../placement/Place";
import Area from "../profilecontrol/areas/Area";
import Dashboard from "../profilecontrol/dashboard/Dashboard";
import Dman from "../profilecontrol/dman/Dman";
import Edit from "../profilecontrol/editprofile/Edit";
import Marchent from "../profilecontrol/marchent/Marchent";
import Order from "../profilecontrol/order/Order";
import User from "../profilecontrol/user/User";
import Userorders from "../profilecontrol/userorders/Userorders";
import "./profile.scss";
const Profile = () => {
  const [isdashboard, setIsdashboard] = useState(false);
  const [isedit, setIsedit] = useState(false);
  const [isdman, setIsdman] = useState(false);
  const [ismarchent, setIsmarchent] = useState(false);
  const [isuser, setIsuser] = useState(false);
  const [isorder, setIsorder] = useState(false);
  const [isarea, setIsarea] = useState(false);
  //for marchent
  const [isordersbyid, setIsordersbyid] = useState(false);
  const [isplaceorder, setIsplaceOrder] = useState(false);

  const navigate = useNavigate();

  const profileControl = (value) => {
    switch (value) {
      case "dashboard":
        setIsdashboard(true);
        setIsedit(false);
        setIsdman(false);
        setIsmarchent(false);
        setIsuser(false);
        setIsorder(false);
        setIsarea(false);
        setIsplaceOrder(false);
        break;
      case "ordersbyid":
        setIsdashboard(false);
        setIsedit(false);
        setIsdman(false);
        setIsmarchent(false);
        setIsuser(false);
        setIsorder(false);
        setIsarea(false);
        setIsordersbyid(true);
        setIsplaceOrder(false);
        break;
      case "placeorder":
        setIsdashboard(false);
        setIsedit(false);
        setIsdman(false);
        setIsmarchent(false);
        setIsuser(false);
        setIsorder(false);
        setIsarea(false);
        setIsordersbyid(false);
        setIsplaceOrder(true);
        break;
      case "edit":
        setIsdashboard(false);
        setIsedit(true);
        setIsdman(false);
        setIsmarchent(false);
        setIsuser(false);
        setIsorder(false);
        setIsarea(false);
        setIsordersbyid(false);
        setIsplaceOrder(false);
        break;
      case "dman":
        setIsdashboard(false);
        setIsedit(false);
        setIsdman(true);
        setIsmarchent(false);
        setIsuser(false);
        setIsorder(false);
        setIsarea(false);
        setIsordersbyid(false);
        setIsplaceOrder(false);
        break;
      case "marchent":
        setIsdashboard(false);
        setIsedit(false);
        setIsdman(false);
        setIsmarchent(true);
        setIsuser(false);
        setIsorder(false);
        setIsarea(false);
        setIsordersbyid(false);
        setIsplaceOrder(false);
        break;
      case "user":
        setIsdashboard(false);
        setIsedit(false);
        setIsdman(false);
        setIsmarchent(false);
        setIsuser(true);
        setIsorder(false);
        setIsarea(false);
        setIsordersbyid(false);
        setIsplaceOrder(false);
        break;
      case "order":
        setIsdashboard(false);
        setIsedit(false);
        setIsdman(false);
        setIsmarchent(false);
        setIsuser(false);
        setIsorder(true);
        setIsarea(false);
        setIsordersbyid(false);
        setIsplaceOrder(false);
        break;
      case "area":
        setIsdashboard(false);
        setIsedit(false);
        setIsdman(false);
        setIsmarchent(false);
        setIsuser(false);
        setIsorder(false);
        setIsarea(true);
        setIsordersbyid(false);
        setIsplaceOrder(false);
        break;
      case "logout":
        localStorage.removeItem("userId");
        navigate("/portal");
        break;

      default:
        break;
    }
  };
  //menu by user
  const [userstatus, setUserstatus] = useState("");
  const [dashboard, setDashboard] = useState(false);
  const [pedit, setPEdit] = useState(false);
  const [dmand, setDmand] = useState(false);
  const [marchentd, setMarchentd] = useState(false);
  const [userm, setUserm] = useState(false);
  const [orderm, setOrderm] = useState(false);
  const [aream, setAream] = useState(false);
  const [ordersbyid, setOrdersbyid] = useState(false);
  //for marchent
  const [placeorder, setPlaceorder] = useState(false);

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
    // console.log("userbyid: ", data);
    setUserstatus(data.user.status);
  };
  // console.log("userbyid: ", userstatus);

  useEffect(() => {
    getuserbyid();
  }, []);
  useEffect(() => {
    if (userstatus === "admin") {
      setIsdashboard(true);
      setDashboard(true);
      setPEdit(true);
      setDmand(true);
      setMarchentd(true);
      setUserm(true);
      setOrderm(true);
      setAream(true);
      //for marchent
      setOrdersbyid(false);
      setPlaceorder(false);
    } else if (userstatus === "marchent") {
      setDashboard(false);

      setDmand(false);
      setMarchentd(false);
      setUserm(false);
      setOrderm(false);
      setAream(false);
      //for marchent
      setOrdersbyid(true);
      setPlaceorder(true);
      setPEdit(true);
    }
  }, [userstatus]);
  return (
    <>
      <div className="dash-container">
        <div className="left">
          <ul>
            {dashboard && (
              <li onClick={() => profileControl("dashboard")}>Dashboard</li>
            )}
            {ordersbyid && (
              <li onClick={() => profileControl("ordersbyid")}>My Orders</li>
            )}
            {placeorder && (
              <li onClick={() => profileControl("placeorder")}>
                Place Your Order
              </li>
            )}
            {pedit && (
              <li onClick={() => profileControl("edit")}>Edit Profile</li>
            )}
            {dmand && (
              <li onClick={() => profileControl("dman")}>DMan Details</li>
            )}
            {marchentd && (
              <li onClick={() => profileControl("marchent")}>
                Marchent/Company Details
              </li>
            )}
            {userm && (
              <li onClick={() => profileControl("user")}>User Management</li>
            )}
            {orderm && (
              <li onClick={() => profileControl("order")}>
                Order Dalivery Management
              </li>
            )}
            {aream && (
              <li onClick={() => profileControl("area")}>Area Management</li>
            )}
            <li onClick={() => profileControl("logout")}>LogOut</li>
          </ul>
        </div>
        <div className="right">
          {isdashboard && <Dashboard />}
          {isordersbyid && <Userorders />}
          {isplaceorder && <Place />}
          {isedit && <Edit />}
          {isdman && <Dman />}
          {ismarchent && <Marchent />}
          {isuser && <User />}
          {isorder && <Order />}
          {isarea && <Area />}
        </div>
      </div>
    </>
  );
};

export default Profile;
