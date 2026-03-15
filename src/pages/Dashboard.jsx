import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateProductModal from '../components/createProduct.jsx'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get('http://localhost:3000/api/product/all-products')
        const data = response.data?.data ?? response.data
        const list = Array.isArray(data) ? data : (data?.products ?? [])
        if (!cancelled) setProducts(list)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load products')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchProducts()
    return () => { cancelled = true }
  }, [])

  const handleCreateProduct = (payload) => {
    const syntheticId = `local-${Date.now()}`
    setProducts((prev) => [
      { id: syntheticId, ...payload },
      ...prev,
    ])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
        <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">Catalog</span>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mt-0.5">Products</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
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
              <div
                key={`skeleton-${i}`}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden"
              >
                <div className="aspect-4/3 bg-zinc-800/80 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-zinc-800 rounded-md w-4/5 animate-pulse" />
                  <div className="h-3 bg-zinc-800/60 rounded w-full animate-pulse" />
                  <div className="h-3 bg-zinc-800/60 rounded w-2/3 animate-pulse" />
                  <div className="h-5 bg-zinc-700/60 rounded w-1/4 mt-4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.1),transparent)]" />
        <div className="relative max-w-sm w-full rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8 text-center backdrop-blur-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400 text-2xl font-medium">
            !
          </div>
          <h2 className="mt-5 text-lg font-semibold text-zinc-100">Couldn’t load products</h2>
          <p className="mt-2 text-zinc-400 text-sm">{error}</p>
          <p className="mt-5 text-zinc-500 text-xs">Ensure the server is running at localhost:3000</p>
        </div>
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.1),transparent)]" />
        <div className="relative max-w-sm w-full rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8 text-center backdrop-blur-sm">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-500 text-2xl font-light">
            ∅
          </div>
          <h2 className="mt-5 text-lg font-semibold text-zinc-100">No products yet</h2>
          <p className="mt-2 text-zinc-400 text-sm">Products will show here once added.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Subtle gradient orb */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">Catalog</span>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mt-0.5">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-500 text-xs font-medium text-white shadow-sm shadow-violet-500/40 hover:bg-violet-600 transition-colors"
            >
              <span className="text-base leading-none">＋</span>
              <span>Add product</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm text-zinc-300 font-medium">Guest</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/30 transition-all duration-200 text-sm font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <article
              key={product.id ?? product._id ?? product.name}
              className="group rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-4/3 bg-zinc-800/50 relative overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name ?? 'Product'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 text-4xl font-light">
                    —
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-zinc-100 text-[15px] leading-snug line-clamp-2">
                  {product.name ?? 'Unnamed product'}
                </h2>
                {product.description && (
                  <p className="mt-2 text-zinc-500 text-sm line-clamp-2 flex-1">
                    {product.description}
                  </p>
                )}
                <div className="mt-4 pt-3 border-t border-zinc-800/80">
                  {product.price != null && (
                    <p className="text-base font-semibold text-violet-400">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <CreateProductModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  )
}

export default Dashboard
