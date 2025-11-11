import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// 🌐 Layouts
const Layout = lazy(() => import("./Layout/layout"));
const AdminLayout = lazy(() => import("./Admin/AdminLayout"));

// 🏠 Main pages
const Home = lazy(() => import("./Home-page/home"));
const Shop = lazy(() => import("./Shop/Shop.jsx"));
const Auth = lazy(() => import("./auth/auth"));
const ForgotPassword = lazy(() => import("./auth/forgotpassword"));
const ProductByid = lazy(() => import("./Products/productByid.jsx"));
const EmailVerificationNotice = lazy(() => import("./auth/verify.jsx"));

// 🧩 Admin pages
const Dashboard = lazy(() => import("./Admin/Dashboard"));
const Users = lazy(() => import("./Admin/Users"));
const Categories = lazy(() => import("./Admin/Categories"));
const Products = lazy(() => import("./Admin/Products"));
const Orders = lazy(() => import("./Admin/Orders"));

function App() {
  return (
    <div className="font-['Jost']">
      {/* Show a fallback while components load */}
      <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
        <Routes>
          {/* 🌐 Main Website Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Home/shop" element={<Shop />} />
            <Route path="/Home/Account" element={<Auth />} />
            <Route path="/Account/Forgot/Password" element={<ForgotPassword />} />
            <Route path="/product/shop" element={<ProductByid />} />
          </Route>

          {/* 🔹 Email Verification */}
          <Route path="/verify" element={<EmailVerificationNotice />} />

          {/* 🧩 Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
