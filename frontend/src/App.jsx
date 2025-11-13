

import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// 🌐 Layouts
const Layout = lazy(() => import("./Layout/layout"));
const AdminLayout = lazy(() => import("./Admin/AdminLayout.jsx"));

// 🏠 Main pages
const VerifyGmail = lazy(() => import("./auth/verifyGmail"));
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

// 🔒 Unauthorized page
const Unauthorized = lazy(() => import("./components/unauthorzied.jsx")); // create this if not already

function App() {
  return (
    <div className="font-['Jost']">
      <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Home/shop" element={<Shop />} />
            <Route path="/Home/Account" element={<Auth />} />
            <Route path="/Account/Forgot/Password" element={<ForgotPassword />} />
            <Route path="/product/shop" element={<ProductByid />} />
          </Route>

          {/* 🔹 Email Verification */}
          <Route path="/verify" element={<EmailVerificationNotice />} />
          <Route path="/verify/:token" element={<VerifyGmail />} />

          {/* ❌ Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 🧩 Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
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
