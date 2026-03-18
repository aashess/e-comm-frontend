import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { getAllProducts } from "../api";

const ease = [0.22, 1, 0.36, 1];

// ProductDetail component displays detailed information about a specific product
// It fetches product data based on the productId from the URL parameters
function ProductDetail() {
  const { productId } = useParams(); // Get productId from URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const [product, setProduct] = useState(null); // State to hold the product data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to hold any error messages

  useEffect(() => {
    let cancelled = false; // Flag to prevent state updates if component unmounts
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllProducts(); // Fetch all products from API
        const data = response?.data ?? response;
        const list = Array.isArray(data) ? data : (data?.products ?? []);
        const foundProduct = list.find( // Find the product matching the productId
          (p) => (p.id ?? p._id ?? p.toString()) === productId,
        );
        if (!cancelled) {
          if (foundProduct) setProduct(foundProduct); // Set product if found
          else setError("Product not found"); // Set error if not found
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load product"); // Set error on fetch failure
      } finally {
        if (!cancelled) setLoading(false); // Stop loading
      }
    }
    fetchProduct();
    return () => { cancelled = true; }; // Cleanup function to cancel async operation
  }, [productId]);

  const handleAddToCart = () => console.log("Added to cart:", product.id); // Placeholder for adding product to cart
  const handleBuyNow = () => console.log("Buy now:", product.id); // Placeholder for buy now functionality

  // Animation variants for staggered product info sections
  const infoContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const infoItemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
  };

  if (loading) {
    // Render loading skeleton while fetching product data
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
        <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center">
            <button onClick={() => navigate(-1)} className="text-zinc-400 hover:text-zinc-200 transition-colors">← Back</button>
          </div>
        </header>
        <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="animate-pulse space-y-8">
            <motion.div
              className="aspect-video bg-zinc-900 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5 }}
            />
            <div className="space-y-4">
              <div className="h-8 bg-zinc-800 rounded-lg w-3/4" />
              <div className="h-4 bg-zinc-800 rounded-lg w-full" />
              <div className="h-4 bg-zinc-800 rounded-lg w-5/6" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    // Render error message if product not found or fetch failed
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
        <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center">
            <motion.button
              onClick={() => navigate(-1)}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
              whileHover={{ x: -3 }}
            >
              ← Back
            </motion.button>
          </div>
        </header>
        <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex items-center justify-center">
          <motion.div
            className="max-w-sm w-full rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8 text-center backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400 text-2xl font-medium"
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              !
            </motion.div>
            <h2 className="mt-5 text-lg font-semibold text-zinc-100">
              {error || "Product not found"}
            </h2>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    // Main product detail view
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <motion.header
        className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center">
          <motion.button
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-zinc-200 transition-colors text-sm font-medium flex items-center gap-2"
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            ← Back
          </motion.button>
        </div>
      </motion.header>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-full aspect-video bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden flex items-center justify-center"
              whileHover={{
                boxShadow: "0 20px 50px -10px rgba(139,92,246,0.15)",
                borderColor: "rgba(139,92,246,0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              {product.image ? (
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease }}
                />
              ) : (
                <div className="text-zinc-600 text-6xl font-light">—</div>
              )}
            </motion.div>
          </motion.div>

          {/* Product Details Section */}
          <motion.div
            className="flex flex-col justify-between"
            variants={infoContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <motion.h1
                className="text-3xl font-bold text-zinc-100 mb-4"
                variants={infoItemVariants}
              >
                {product.name || "Unnamed product"} {/* Display product name */}
              </motion.h1>

              {product.price != null && (
                <motion.div className="mb-6" variants={infoItemVariants}>
                  <p className="text-sm text-zinc-500 mb-2">Price</p>
                  <p className="text-4xl font-bold text-violet-400">
                    ₹{Number(product.price).toLocaleString("en-IN")} {/* Format price in INR */}
                  </p>
                </motion.div>
              )}

              {product.description && (
                <motion.div className="mb-6" variants={infoItemVariants}>
                  <p className="text-sm text-zinc-500 mb-2">Description</p>
                  <p className="text-zinc-300 leading-relaxed">
                    {product.description} {/* Display product description */}
                  </p>
                </motion.div>
              )}

              {product.category && (
                <motion.div className="mb-6" variants={infoItemVariants}>
                  <p className="text-sm text-zinc-500 mb-2">Category</p>
                  <p className="text-zinc-300">{product.category} {/* Display product category */}</p>
                </motion.div>
              )}

              {product.stock != null && (
                <motion.div className="mb-6" variants={infoItemVariants}>
                  <p className="text-sm text-zinc-500 mb-2">Stock</p>
                  <p className="text-zinc-300">
                    {product.stock > 0
                      ? `${product.stock} available` // Show available stock
                      : "Out of stock"} {/* Show out of stock message */}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease }}
            >
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-900/60 border border-violet-500/30 text-violet-400 hover:bg-zinc-900/80 hover:border-violet-500/50 transition-all duration-200 font-medium"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Add to Cart {/* Button to add product to cart */}
              </motion.button>
              <motion.button
                onClick={handleBuyNow}
                className="flex-1 px-4 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-all duration-200 font-medium shadow-sm shadow-violet-500/40"
                whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 25px -5px rgba(139,92,246,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Buy Now {/* Button for immediate purchase */}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetail;
