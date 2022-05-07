import React, { useEffect } from "react";

const Magic = ({ magic, setmagic }) => {
  useEffect(() => {
    setTimeout(() => {
      if (magic === true) {
        setmagic(false);
      }
    }, 500);
  }, [magic, setmagic]);
  return <div>Magic</div>;
};

export default Magic;
