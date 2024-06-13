import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import Dashboard from "./Pages/User/Dashboard";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import PageNotFound from "./Pages/PageNotFound";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import CreateCategory from "./Pages/admin/CreateCategory";
import CreateProduct from "./Pages/admin/CreateProduct";
import Users from "./Pages/admin/Users";
import Profile from "./Pages/User/Profile";
import Order from "./Pages/User/Order";
import Products from "./Pages/admin/Products";
import UpdateProduct from "./Pages/admin/UpdateProduct";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/category" element={<Category />} /> */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Order />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />

          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />

        <Route path="/register" element={<Register />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
