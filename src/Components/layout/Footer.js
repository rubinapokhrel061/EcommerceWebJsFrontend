import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-green-500 text-center w-[100%] py-3">
      <h3>All Right Reserved &copy</h3>
      <div className=" flex gap-3 justify-center">
        <Link
          to=""
          className=" focus:boder  focus:border-b-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
        >
          About
        </Link>
        |
        <Link
          to=""
          className=" focus:boder focus:border-b-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
        >
          Contact
        </Link>
        |
        <Link
          to=""
          className=" focus:boder focus:border-b-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
