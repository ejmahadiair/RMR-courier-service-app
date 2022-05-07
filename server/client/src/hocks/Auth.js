import { useEffect, useState } from "react";

export default function useAuth(authcheck) {
  // console.log("auth :", authcheck.auth);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (authcheck.auth === "true") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return auth;
}
