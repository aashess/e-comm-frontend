import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import CreateProductModal from "../components/CreateProduct.jsx";
import { getAllProducts, getUser } from "../api";

const ease = [0.22, 1, 0.36, 1];

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInOrNot = async () => {
      try {
        const response = await getUser();

        setLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    };
    loggedInOrNot();
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllProducts(); // api call for all product in dashboard.
        const data = response?.data ?? response;
        const list = Array.isArray(data) ? data : (data?.products ?? []);
        if (!cancelled) setProducts(list);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleBuyNow = () => console.log("Buy clicked "); // buy
  const handleAddToCart = () => console.log("Added to cart"); // add to cart
  const handleCreateProduct = (payload) => {
    const syntheticId = `local-${Date.now()}`;
    setProducts((prev) => [{ id: syntheticId, ...payload }, ...prev]);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    const name = (product.name ?? "").toLowerCase();
    const description = (product.description ?? "").toLowerCase();
    return name.includes(searchLower) || description.includes(searchLower);
  });

  // Card stagger variants
  const gridVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
        <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                Catalog
              </span>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mt-0.5">
                Products
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/30 transition-all duration-200 text-sm font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </header>
        <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease }}
              >
                <div className="aspect-4/3 bg-zinc-800/80 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-zinc-800 rounded-md w-4/5 animate-pulse" />
                  <div className="h-3 bg-zinc-800/60 rounded w-full animate-pulse" />
                  <div className="h-3 bg-zinc-800/60 rounded w-2/3 animate-pulse" />
                  <div className="h-5 bg-zinc-700/60 rounded w-1/4 mt-4 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.1),transparent)]" />
        <motion.div
          className="relative max-w-sm w-full rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8 text-center backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400 text-2xl font-medium"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            !
          </motion.div>
          <h2 className="mt-5 text-lg font-semibold text-zinc-100">
            Couldn't load products
          </h2>
          <p className="mt-2 text-zinc-400 text-sm">{error}</p>
          <p className="mt-5 text-zinc-500 text-xs">
            Ensure the server is running at localhost:3000
          </p>
        </motion.div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.1),transparent)]" />
        <motion.div
          className="relative max-w-sm w-full rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8 text-center backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-500 text-2xl font-light"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
          >
            ∅
          </motion.div>
          <h2 className="mt-5 text-lg font-semibold text-zinc-100">
            No products yet
          </h2>
          <p className="mt-2 text-zinc-400 text-sm">
            Products will show here once added.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Subtle gradient orb */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <motion.header
        className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Catalog
            </span>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mt-0.5">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-500 text-xs font-medium text-white shadow-sm shadow-violet-500/40 hover:bg-violet-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-base leading-none">＋</span>
              <span>Add product</span>
            </motion.button>

            {loggedIn ? (
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => navigate("/cart")}
                  className="relative p-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-800 hover:border-violet-500/30 transition-all"
                  title="Shopping Cart"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-6 h-6"
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
                </motion.button>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-violet-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-sm text-zinc-300 font-medium hover:text-white transition-colors"
                  >
                    Profile
                  </button>
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <>
                <motion.button
                  onClick={() => navigate("/cart")}
                  className="relative p-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-800 hover:border-violet-500/30 transition-all"
                  title="Shopping Cart"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-6 h-6"
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
                </motion.button>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-violet-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-zinc-300 font-medium">
                    Guest
                  </span>
                </div>
                <motion.button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/30 transition-all duration-200 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <motion.div
          className="border-t border-zinc-800/50 bg-zinc-900/30 px-4 sm:px-6 lg:px-8 py-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:bg-zinc-800/70 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.header>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredProducts.length === 0 ? (
          <motion.div
            className="flex items-center justify-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="max-w-sm w-full rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-8 text-center backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-500 text-2xl font-light mb-4">
                ∅
              </div>
              <h2 className="text-lg font-semibold text-zinc-100">
                {searchTerm ? "No products found" : "No products yet"}
              </h2>
              <p className="mt-2 text-zinc-400 text-sm">
                {searchTerm
                  ? `No results for "${searchTerm}". Try a different search.`
                  : "Products will show here once added."}
              </p>
              {searchTerm && (
                <motion.button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-all text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear search
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <motion.article
                key={product.id ?? product._id ?? product.name}
                onClick={() =>
                  navigate(`/product/${product.id ?? product._id}`)
                }
                className="group rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col cursor-pointer"
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow:
                    "0 20px 40px -12px rgba(139,92,246,0.12), 0 0 0 1px rgba(139,92,246,0.1)",
                  transition: { duration: 0.25, ease },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-4/3 bg-zinc-800/50 relative overflow-hidden">
                  {product.image ? (
                    <motion.img
                      src={product.image}
                      alt={product.name ?? "Product"}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5, ease }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-4xl font-light">
                      —
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="font-semibold text-zinc-100 text-[15px] leading-snug line-clamp-2">
                    {product.name ?? "Unnamed product"}
                  </h2>
                  {product.description && (
                    <p className="mt-2 text-zinc-500 text-sm line-clamp-2 flex-1">
                      {product.description}
                    </p>
                  )}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80">
                    {product.price != null && (
                      <p className="text-base font-semibold text-violet-400">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </main>

      <CreateProductModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
}

export default Dashboard;
