import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/layout/Layout";

const PageNotFound = () => {
  return (
    <>
      <Layout>
        <div className="min-h-screen text-center">
          <h1 className="">404</h1>
          <h2 className="">Oops ! Page Not Found</h2>
          <Link to="/" className="">
            Go Back
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default PageNotFound;
