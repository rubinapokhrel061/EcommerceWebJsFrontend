import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const authcheck = async () => {
      const res = await axios.get(
        "https://digitalshop-n2jx.onrender.com/auth/userauth"
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authcheck();
  }, [auth?.token]);

  return <>{ok ? <Outlet /> : <Spinner />}</>;
};

export default PrivateRoute;
