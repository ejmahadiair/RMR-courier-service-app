import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import useAuth from "../../hocks/Auth";

export default function PrivateOutlate({ auth }) {
  return auth === "true" ? <Outlet /> : <Navigate to="/portal" />;
}
