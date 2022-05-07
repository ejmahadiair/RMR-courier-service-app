import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ShipNow from "./components/shipnow/ShipNow";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Portal from "./components/Portal/Portal";
import Profile from "./components/profile/Profile";
import PrivateOutlate from "./components/privateOutlet/PrivateOutlate";
import Trackdetails from "./components/Trackdetails/Trackdetails";

function App() {
  const [auth, setAuth] = useState("");
  const portaltoapp = (data) => {
    setAuth(data.auth);
  };

  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" exect element={<Home />} />
          <Route path="/ship" exect element={<ShipNow />} />
          <Route path="/track" element={<Trackdetails />} />
          <Route
            path="/portal"
            exect
            element={<Portal portaltoapp={portaltoapp} />}
          />
          <Route path="/*" element={<PrivateOutlate auth={auth} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
