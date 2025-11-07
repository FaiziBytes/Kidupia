import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser, FaBox, FaList, FaReceipt } from "react-icons/fa6";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  const sidebarItems = [
    { name: "Dashboard", icon: <MdSpaceDashboard />, path: "dashboard" },
    { name: "Users", icon: <FaUser />, path: "users" },
    { name: "Categories", icon: <FaList />, path: "categories" },
    { name: "Products", icon: <FaBox />, path: "products" },
    { name: "Orders", icon: <FaReceipt />, path: "orders" },
  ];

  return (
    <div className="flex h-screen bg-[#F3F4F6]">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex w-[23%] bg-pink-600 text-white flex-col">
        <h1 className="text-2xl py-4 font-semibold text-center border-b border-white/30">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-2 mt-4 px-3">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg px-3 py-2 rounded-md transition-all ${
                  isActive ? "bg-black text-white" : "hover:bg-black/30"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-pink-600 text-white flex justify-between items-center px-4 py-3 z-50">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <button onClick={() => setOpen(true)}>
          <IoMdMenu className="text-3xl" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-0 top-0 w-64 h-full bg-pink-600 text-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Admin</h1>
              <IoMdClose
                className="text-2xl cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-3">
              {sidebarItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={`/admin/${item.path}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-lg px-3 py-2 rounded-md transition-all ${
                      isActive ? "bg-black text-white" : "hover:bg-black/30"
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 mt-8 md:mt-0 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;



