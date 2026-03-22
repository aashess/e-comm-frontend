

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
void motion; // keep lint happy (motion is used via namespace properties like motion.header)
import { getAllCartItems } from "../api";
import { payment } from "../api/payment";
import { useLocation } from "react-router-dom";


const ease = [0.22, 1, 0.36, 1];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const totalPrice = location.state?.totalPrice
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllCartItems();
        const data = response?.data ?? response;
        setCart(data);
      } catch (err) {
        setError(err.message || "Unable to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const items = useMemo(() => {
    if (Array.isArray(cart)) return cart;
    if (cart?.items && Array.isArray(cart.items)) return cart.items;
    return [];
  }, [cart]);

  const totalAmount = useMemo(() => {
    if (typeof cart?.totalAmount === "number") return cart.totalAmount;
    if (typeof cart?.total === "number") return cart.total;
    if (typeof cart === "number") return cart;
    if (Array.isArray(items)) {
      return items.reduce((sum, item) => {
        const value = Number(item?.price ?? item?.amount ?? 0);
        return sum + (Number.isFinite(value) ? value : 0);
      }, 0);
    }
    return 0;
  }, [cart, items]);

  const handlePay = async () => {
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty. Add items before proceeding.");
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        items,
        amount: totalAmount,
      };

      const response = await payment(orderPayload);
      if (response?.status === 200 || response?.status === 201) {
        setSuccess("Payment initialized. You will be redirected to Razorpay shortly.");
        setTimeout(() => navigate("/dashboard"), 2500);
      } else {
        setError("Payment could not be initiated. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Payment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.12),transparent)]" />

      <motion.header
        className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <motion.button
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-zinc-200 transition-colors text-sm font-medium flex items-center gap-2"
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            ← Back
          </motion.button>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Checkout</h1>
          <div className="w-24" />
        </div>
      </motion.header>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Review your order
              </h2>
              <p className="text-sm text-zinc-400 mb-6">
                Your payment will be handled by Razorpay. You'll be redirected to the secure checkout experience.
              </p>

              <div className="space-y-4 mb-6 border-b border-zinc-700/50 pb-6">
                {items.length === 0 ? (
                  <p className="text-sm text-zinc-400">
                    Your cart is currently empty.
                  </p>
                ) : (
                  items.map((item, idx) => {
                    const label =
                      item?.name || item?.title || item?.productName || String(item);
                    const price = item?.price ?? item?.amount ?? "";
                    return (
                      <div
                        key={idx}
                        className="flex items-start justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-zinc-100">
                            {label}
                          </p>
                          {price ? (
                            <p className="text-xs text-zinc-500">
                              ₹{price}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="space-y-3 mb-6">
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

              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-200">
                  {success}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="button"
                  onClick={handlePay}
                  disabled={submitting || totalPrice === 0}
                  className="flex-1 rounded-xl bg-violet-500 text-white py-3 text-sm font-medium shadow-sm shadow-violet-500/40 hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? "Processing…" : `Pay ₹${totalPrice || 0}`}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 rounded-xl border border-zinc-700/80 bg-zinc-900/40 py-3 text-sm font-medium text-zinc-200 hover:bg-zinc-900/60 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back to cart
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Payment;
