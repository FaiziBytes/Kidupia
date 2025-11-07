// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./Layout/layout";
// import Home from "./Home-page/home";
// import Shop from "./Shop/Shop";
// import Admindashboard from "./Admin/admindashboard";
// import Auth from "./auth/auth";
// import ForgotPassword from "./auth/forgotpassword";


// function App() {
//   return (
//     <div className="font-['Jost']">
//       <BrowserRouter>
//         <Routes>
//           {/* Layout Routes (with navbar, footer, etc.) */}
//           <Route element={<Layout />}>
          
//             <Route path="/" element={<Home />}/> {/* ✅ Home loads first */}
//             <Route path="/Home/shop" element={<Shop />} />
//             <Route path="/Home/Account" element={<Auth/>}/>
//             <Route path="/Account/Forgot/Password" element={<ForgotPassword/>}/>
//           </Route>

//           {/* Admin route (no layout) */}
//           <Route path="/admin/*" element={<Admindashboard/>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./Home-page/home";
import Shop from "./Shop/Shop";
import Auth from "./auth/auth";
import ForgotPassword from "./auth/forgotpassword";

// ✅ Admin Imports
import AdminLayout from "./Admin/AdminLayout";
// import Dashboard from "./Admin/Dashboard";
import Dashboard from "./Admin/Dashboard";
import Users from "./Admin/Users";
import Categories from "./Admin/Categories";
import Products from "./Admin/Products";
import Orders from "./Admin/Orders";

function App() {
  return (
    <div className="font-['Jost']">
      <BrowserRouter>
        <Routes>
          {/* 🌐 Main Website Layout (with Navbar + Footer) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} /> {/* ✅ Home loads first */}
            <Route path="/Home/shop" element={<Shop />} />
            <Route path="/Home/Account" element={<Auth />} />
            <Route path="/Account/Forgot/Password" element={<ForgotPassword />} />
          </Route>

          {/* 🧩 Admin Routes (Separate Layout)*/}
          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
