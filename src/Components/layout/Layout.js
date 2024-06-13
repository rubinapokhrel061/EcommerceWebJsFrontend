import React from "react";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>

      <Toaster />

      <Footer />
    </>
  );
};

export default Layout;
