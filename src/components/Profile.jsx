import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api";
import { profileData } from "../api/profile";
import { motion } from "motion/react";

const user = {
  name: "Aashish Jha",
  email: "hello@gmail.com",
  role: "ADMIN",
  createdAt: "16 Jan 2026",
  profile_picture: "https://avatars.githubusercontent.com/u/92213759?v=4",
  address: "Noida Sector 17",
  cart: ["pen", "cup", "keyboard", "mouse", "monitor", "laptop"],
};

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [address, setAddress] = useState("");
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await profileData();
        console.log(response);

        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
        setCreatedAt(response.data.createdAt);
        setOrder(response.data.ordes);
        setId(response.data.id);
        setCart(response.data.cart);
        setAddress(response.data.address);

        // const userDetails = [cart]
      } catch (error) {
        console.error("Error while fetching User Details.", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "ease-out" }}
      className="min-h-screen bg-zinc-950 text-zinc-100"
    >
      {/* Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]"
      />
      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-zinc-400 hover:text-zinc-200 transition-colors text-sm font-medium flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            My Profile
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </motion.header>
      {/* Main Content */}
      <motion.main
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 sticky top-24">
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={user.profile_picture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-2 border-violet-500/30"
                  />
                  <div className="absolute inset-0 rounded-full bg-linear-to-tr from-violet-500/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-center text-zinc-100 mb-2">
                {name || "User"}
              </h2>

              {/* Role Badge */}
              {role && (
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-medium">
                    {role}
                  </span>
                </div>
              )}

              {/* Quick Info */}
              <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                <div className="text-center">
                  <p className="text-xs text-zinc-500 mb-1">Email</p>
                  <p className="text-sm text-zinc-300 truncate">{email}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-zinc-500 mb-1">Member Since</p>
                  <p className="text-sm text-zinc-300">{createdAt}</p>
                </div>
                {address && (
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 mb-1">Address</p>
                    <p className="text-sm text-zinc-300">{address}</p>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <button className="w-full mt-6 px-4 py-2.5 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors text-sm font-medium shadow-sm shadow-violet-500/40">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Main Content - Right Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6">
              <h3 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Account Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-500 font-medium">
                    User ID
                  </label>
                  <p className="text-zinc-300 mt-1 font-mono text-sm">{id}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium">
                    Email
                  </label>
                  <p className="text-zinc-300 mt-1 text-sm">{email}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium">
                    Role
                  </label>
                  <p className="text-zinc-300 mt-1 text-sm">{role}</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium">
                    Member Since
                  </label>
                  <p className="text-zinc-300 mt-1 text-sm">{createdAt}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-zinc-500 font-medium">
                    Address
                  </label>
                  <p className="text-zinc-300 mt-1 text-sm">
                    {address || "Not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6">
              <h3 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Cart Items ({cart && cart.length > 0 ? cart.length : 0})
              </h3>

              {cart && cart.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800/80 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
                          <svg
                            className="w-4 h-4 text-violet-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-zinc-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-violet-500/30 text-violet-400 hover:bg-zinc-800 hover:border-violet-500/50 transition-all text-sm font-medium">
                    View Cart
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mb-3">
                    <svg
                      className="w-6 h-6 text-zinc-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-zinc-400 text-sm">Your cart is empty</p>
                  <p className="text-zinc-600 text-xs mt-1">
                    Add items from the dashboard to get started
                  </p>
                </div>
              )}
            </div>

            {/* Orders */}
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6">
              <h3 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Orders ({order && order.length > 0 ? order.length : 0})
              </h3>

              {order && order.length > 0 ? (
                <div className="space-y-3">
                  {order.map((ord, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800/80 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-100">
                          Order #{index + 1}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          {ord || "Order details"}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                        Completed
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mb-3">
                    <svg
                      className="w-6 h-6 text-zinc-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-zinc-400 text-sm">No orders yet</p>
                  <p className="text-zinc-600 text-xs mt-1">
                    Start shopping to place your first order
                  </p>
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 text-center">
                <p className="text-3xl font-bold text-violet-400">
                  {cart ? cart.length : 0}
                </p>
                <p className="text-xs text-zinc-500 mt-2 uppercase tracking-wider">
                  Items in Cart
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 text-center">
                <p className="text-3xl font-bold text-violet-400">
                  {order ? order.length : 0}
                </p>
                <p className="text-xs text-zinc-500 mt-2 uppercase tracking-wider">
                  Total Orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default Profile;
