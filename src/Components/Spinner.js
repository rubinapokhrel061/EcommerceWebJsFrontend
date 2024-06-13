import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location, path]);
  console.log(location.pathname);
  return (
    <div className="flex flex-col gap-4 text-center justify-center h-[100vh]">
      <h1 className="text-3xl font-semibold ">
        Redirecting to you in {count} second
      </h1>
      <div
        className="inline-block h-8 w-8 mx-auto animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute  !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
