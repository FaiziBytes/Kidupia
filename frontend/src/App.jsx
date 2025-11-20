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
const Checkout = lazy(() => import("./components/checkout.jsx"));
const ForgotPassword = lazy(() => import("./auth/forgotpassword"));
const ProductByid = lazy(() => import("./Products/productByid.jsx"));
const EmailVerificationNotice = lazy(() => import("./auth/verify.jsx"));
const Unauthorized = lazy(() => import("./components/unauthorzied.jsx"));

// 🧩 Admin pages
const Dashboard = lazy(() => import("./Admin/Dashboard"));
const Users = lazy(() => import("./Admin/Users"));
const Categories = lazy(() => import("./Admin/Categories"));
const Products = lazy(() => import("./Admin/Products"));
const Orders = lazy(() => import("./Admin/Orders"));
const AddProduct = lazy(() => import("./components/AddaProduct.jsx"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      <p className="mt-2 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="font-['Jost']">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="Home/Account" element={<Auth />} />
            <Route path="Account/Forgot/Password" element={<ForgotPassword />} />
            <Route path="product/:id" element={<ProductByid />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          {/* 🔹 Email Verification */}
          <Route path="verify" element={<EmailVerificationNotice />} />
          <Route path="verify/:token" element={<VerifyGmail />} />

          {/* ❌ Unauthorized */}
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* 🧩 Protected Admin Routes */}
          <Route
            path="admin/*"
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
            <Route path="add/product" element={<AddProduct />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;