import React from "react";
import "./edit.scss";
const Edit = () => {
  return (
    <>
      <div className="edit-container">
        <div className="edit">
          <h1>Edit and Update your profile</h1>
          <form>
            <input type="text" name="name" placeholder="Enter New Name" />
            <input type="email" name="email" placeholder="Enter New Email" />
            <button type="button">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
