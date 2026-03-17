import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch cart items from API or localStorage
    setIsLoading(false);
  }, []);

  const handleRemoveItem = (item) => {
    setCartItems((prev) => prev.filter((i) => i !== item));
  };

  const handleContinueShopping = () => {
    navigate("/dashboard");
  };

  const totalPrice = 0; // TODO: Calculate total from cart items

  // Item stagger variants
  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
    exit: {
      opacity: 0,
      x: 40,
      scale: 0.95,
      transition: { duration: 0.25, ease },
    },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Gradient Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      {/* Header */}
      <motion.header
        className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <motion.button
            onClick={() => navigate("/dashboard")}
            className="text-zinc-400 hover:text-zinc-200 transition-colors text-sm font-medium flex items-center gap-2"
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            ← Back to Dashboard
          </motion.button>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Shopping Cart
          </h1>
          <div className="w-24" />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {cartItems.length === 0 ? (
          <motion.div
            className="flex items-center justify-center py-20"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="max-w-sm w-full rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-8 text-center backdrop-blur-sm">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-500 text-2xl font-light mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                ∅
              </motion.div>
              <motion.h2
                className="text-lg font-semibold text-zinc-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                Your cart is empty
              </motion.h2>
              <motion.p
                className="mt-2 text-zinc-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                Add items from the dashboard to get started shopping.
              </motion.p>
              <motion.button
                onClick={handleContinueShopping}
                className="mt-6 px-4 py-2.5 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors text-sm font-medium shadow-sm shadow-violet-500/40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px -5px rgba(139,92,246,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">
                  Cart Items ({cartItems.length})
                </h2>
                <motion.div
                  className="space-y-4"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800/80 transition-colors"
                        variants={itemVariants}
                        exit="exit"
                        layout
                        whileHover={{
                          borderColor: "rgba(139,92,246,0.2)",
                        }}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-zinc-100">
                            {item}
                          </p>
                        </div>
                        <motion.button
                          onClick={() => handleRemoveItem(item)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-xs font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Remove
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>

            {/* Order Summary - slide in from right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
            >
              <motion.div
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 sticky top-24"
                whileHover={{
                  boxShadow:
                    "0 15px 40px -8px rgba(139,92,246,0.08)",
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-zinc-100 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-zinc-700/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-zinc-100">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="text-zinc-100">₹0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Tax</span>
                    <span className="text-zinc-100">₹0</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-semibold text-zinc-100">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-violet-400">
                    ₹{totalPrice}
                  </span>
                </div>

                <motion.button
                  className="w-full px-4 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors font-medium shadow-sm shadow-violet-500/40 mb-3"
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 8px 25px -5px rgba(139,92,246,0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Proceed to Checkout
                </motion.button>

                <motion.button
                  onClick={handleContinueShopping}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-violet-500/30 text-violet-400 hover:bg-zinc-800 hover:border-violet-500/50 transition-all text-sm font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
