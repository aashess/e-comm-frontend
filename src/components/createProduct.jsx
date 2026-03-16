import axios from "axios";
import React, {useEffect, useState } from "react";
import { getAllSubcategories, createProduct } from "../api";

const API_BASE = import.meta.env.VITE_API_URL;

function CreateProductModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectSubCategories, setSelectSubCategories] = useState()
  



  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await getAllSubcategories();
        setSubCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchSubCategories();
  }, []);
    // console.log(subCategories);


if (!isOpen) return null;

const handleSubCategoriesChange = (e) => {
    setSelectSubCategories(e.target.value)
    // console.log(selectSubCategories);
    
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    const payload = {
      name: name.trim(),
      description: description.trim() || undefined,
      stock: stockQuantity ? Number(stockQuantity) : 0,
      price: price ? Number(price) : 0,
      subcategoryId: selectSubCategories
    };

    if (!payload.name) {
      return;
    }
    
    try {
      const response = await createProduct(payload);
      console.log(response);
      
      if (typeof onCreate === "function") {
        onCreate(payload);
      }

      setName("");
      setDescription("");
      setStockQuantity("");
      setPrice("");
      setCategoriesId("");
      if (typeof onClose === "function") onClose();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,119,198,0.25),transparent)]" />

      <div className="relative w-full max-w-lg mx-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/90 shadow-2xl shadow-black/50 overflow-hidden">
        <div className="h-1 w-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-sky-400" />

        <div className="flex items-start justify-between px-5 pt-4 pb-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              New product
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-zinc-50">
              Create product
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Add basic details for a product in your catalog.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            <span className="sr-only">Close</span>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 pb-5 pt-1 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Product name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Winter canvas jacket"
                className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/40"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Short summary of the product, materials, or positioning."
                className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/40 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Stock quantity
                </label>
                <input
                  type="number"
                  min={0}
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/40"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Price
                </label>
                <div className="flex items-center rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-3.5 py-2.5 focus-within:border-violet-500/60 focus-within:ring-1 focus-within:ring-violet-500/40">
                  <span className="mr-1.5 text-xs text-zinc-500">₹</span>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Category ID
              </label>
              <select onChange={handleSubCategoriesChange}>
                {subCategories.map((e) => {
                  
                  return <option key={e.id} value={e.id}>{e.name}</option>

                })}
                      
                     </select>
              {/* <input
                type="text"
                value={categoriesId}
                onChange={(e) => setCategoriesId(e.target.value)}
                placeholder="e.g. apparel-men-outerwear"
                className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/40"
              /> */}
              <p className="mt-1 text-[11px] text-zinc-500">
                Use the internal identifier for the category in your backend.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800/80 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-zinc-700/80 bg-zinc-900/60 text-xs font-medium text-zinc-300 hover:bg-zinc-800/80 hover:border-zinc-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-xs font-medium text-white shadow-sm shadow-violet-500/40 transition-colors"
            >
              Create product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductModal;

