import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-[#D1D1c7] text-center w-[100%] py-2">
      <h3>All Right Reserved &copy</h3>
      <div className=" flex gap-3 justify-center">
        <Link
          to="/about"
          className=" focus:boder  focus:border-b-2 focus:border-black"
        >
          About
        </Link>
        |
        <Link
          to="/contact"
          className=" focus:boder focus:border-b-2 focus:border-black"
        >
          Contact
        </Link>
        |
        <Link
          to="/policy"
          className=" focus:boder focus:border-b-2 focus:border-black"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
