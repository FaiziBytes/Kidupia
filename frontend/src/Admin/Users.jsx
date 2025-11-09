// 

import React, { useEffect, useState } from "react";
import { FaUser, FaUserCheck, FaUserTimes, FaUserPlus } from "react-icons/fa";

const Users = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Simulate backend data for users
  useEffect(() => {
    setTimeout(() => {
      try {
        const dummyStats = {
          totalUsers: 120,
          activeUsers: 90,
          newThisMonth: 15,
          blockedUsers: 5,
        };

        const dummyUsers = [
          {
            _id: "USR001",
            name: "John Doe",
            email: "john@example.com",
            joined: "2025-10-15",
            status: "Active",
            role: "Customer",
          },
          {
            _id: "USR002",
            name: "Jane Smith",
            email: "jane@example.com",
            joined: "2025-09-22",
            status: "Blocked",
            role: "Customer",
          },
          {
            _id: "USR003",
            name: "Ali Khan",
            email: "ali.khan@example.com",
            joined: "2025-11-02",
            status: "Active",
            role: "Admin",
          },
          {
            _id: "USR004",
            name: "Sara Ahmed",
            email: "sara.ahmed@example.com",
            joined: "2025-10-05",
            status: "Pending",
            role: "Customer",
          },
        ];

        setStats(dummyStats);
        setUsers(dummyUsers);
      } catch (err) {
        setError("Failed to load dummy data");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Users</h1>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading user data...</p>
      ) : error ? (
        <div className="text-red-600 bg-red-50 p-4 rounded-lg">
          ⚠️ Error: {error}
        </div>
      ) : (
        <>
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<FaUser className="text-blue-600 text-xl" />}
              bg="bg-blue-100"
            />
            <StatCard
              title="Active Users"
              value={stats.activeUsers}
              icon={<FaUserCheck className="text-green-600 text-xl" />}
              bg="bg-green-100"
            />
            <StatCard
              title="New This Month"
              value={stats.newThisMonth}
              icon={<FaUserPlus className="text-yellow-600 text-xl" />}
              bg="bg-yellow-100"
            />
            <StatCard
              title="Blocked Users"
              value={stats.blockedUsers}
              icon={<FaUserTimes className="text-red-600 text-xl" />}
              bg="bg-red-100"
            />
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow mt-10 overflow-x-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                All Users
              </h2>
              <button className="text-sm text-blue-600 hover:underline">
                Add New
              </button>
            </div>

            {users.length === 0 ? (
              <p className="p-6 text-gray-500">No users found.</p>
            ) : (
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6">User ID</th>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Joined</th>
                    <th className="py-3 px-6">Role</th>
                    <th className="py-3 px-6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-6 font-medium text-gray-800">
                        #{user._id}
                      </td>
                      <td className="py-3 px-6">{user.name}</td>
                      <td className="py-3 px-6">{user.email}</td>
                      <td className="py-3 px-6">
                        {new Date(user.joined).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6">{user.role}</td>
                      <td
                        className={`py-3 px-6 font-medium ${
                          user.status === "Active"
                            ? "text-green-600"
                            : user.status === "Pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {user.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// ✅ Reusable Card Component
const StatCard = ({ title, value, icon, bg }) => (
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
      </div>
      <div className={`${bg} p-3 rounded-xl`}>{icon}</div>
    </div>
  </div>
);

export default Users;
