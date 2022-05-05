import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteForever } from "@material-ui/icons";
import "./user.scss";
import Edit from "../editprofile/Edit";
import Magic from "../magic/Magic";
const User = ({ setIsedit }) => {
  const [isuseedit, setUseredit] = useState(false);
  const [magic, setmagic] = useState(false);
  const [check, setCheck] = useState(false);
  const [user, setUser] = useState([]);
  const [hasid, setHasid] = useState("");

  const getalluser = async () => {
    const res = await fetch("http://localhost:5000/api/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log("User data: ", data);
    setUser(data.alluser);
  };

  useEffect(() => {
    getalluser();
  }, []);
  console.log("User data: ", user);

  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    alert(data.message);
    setCheck(data.check);
  };

  const deletehandler = (id) => {
    deleteUser(id);
  };
  useEffect(() => {
    if (check === true) {
      setmagic(true);
      setCheck(false);
    }
  }, [check]);

  const editme = (id) => {
    setUseredit(true);
    setIsedit(false);
    setHasid(id);
  };
  return (
    <>
      {!isuseedit ? (
        <>
          {!magic &&
            user.map((item, key) => {
              return (
                <div className="user-container" key={key}>
                  <div className="block">
                    <h1>{item.name}</h1>
                  </div>
                  <div className="block">
                    <h3>{item.email}</h3>
                  </div>
                  <div className="block">
                    <h4>{item.status}</h4>
                  </div>
                  <div className="block update">
                    <EditOutlined
                      className="edit"
                      onClick={() => editme(item._id)}
                    />
                  </div>
                  <div
                    className="block update"
                    onClick={() => deletehandler(item._id)}
                  >
                    <DeleteForever className="delete" />
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <>
          <Edit hasid={hasid} />
        </>
      )}
      {magic && <Magic magic={magic} setmagic={setmagic} />}
    </>
  );
};

export default User;
