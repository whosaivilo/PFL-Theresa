import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function Products() {
  const { role, session } = useAuth();
  const userId = session?.user?.id;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductsAndUser();
  }, []);

  const fetchProductsAndUser = async () => {
    try {
      setLoading(true);
      // Get Products
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10)
        }]);

      if (error) throw error;
      
      alert("Berhasil menambahkan produk!");
      setFormData({ name: "", description: "", price: "", stock: "" });
      setIsAdding(false);
      fetchProductsAndUser();
    } catch (error) {
      console.error("Error inserting product:", error);
      alert(error.message || "Gagal menambahkan produk");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleBuy = async (product) => {
    if (!userId || role !== 'member') {
      alert("Hanya member yang dapat membeli produk ini.");
      return;
    }

    if (product.stock < 1) {
      alert("Maaf, stok produk habis.");
      return;
    }

    if (!window.confirm(`Apakah Anda yakin ingin membeli ${product.name} seharga ${formatRupiah(product.price)}?`)) return;

    try {
      // 1. Buat pesanan dengan status 'pending'
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: userId,
          total_amount: product.price,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Buat rincian pesanan (order_items)
      const { error: itemError } = await supabase
        .from('order_items')
        .insert([{
          order_id: orderData.id,
          product_id: product.id,
          quantity: 1,
          unit_price: product.price
        }]);

      if (itemError) throw itemError;

      // 3. Potong stok produk
      const { error: stockError } = await supabase
        .from('products')
        .update({ stock: product.stock - 1 })
        .eq('id', product.id);

      if (stockError) throw stockError;

      alert("Pesanan berhasil dibuat! Silakan cek menu Dashboard untuk melihat status pesanan.");
      navigate('/');
    } catch (error) {
      console.error("Error buying product:", error);
      alert("Terjadi kesalahan saat membuat pesanan.");
    }
  };

  const formatRupiah = (angka) => {
    if (!angka) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div id="dashboard-container">
      <PageHeader title="Product Catalog">
        {role === 'admin' && (
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-emerald-600 transition-all"
          >
            {isAdding ? "Back to List" : "Add New Product"}
          </button>
        )}
      </PageHeader>

      <div className="mt-5 overflow-x-auto bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        {isAdding && role === 'admin' ? (
          <div>
            <h2 className="text-xl font-bold mb-6 text-slate-700">Form Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Nama produk" 
                  className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Description</label>
                <input 
                  type="text" 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi singkat" 
                  className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Price</label>
                <input 
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="10000" 
                  className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600">Stock</label>
                <input 
                  type="number" 
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="50" 
                  className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                />
              </div>

              <div className="col-span-1 md:col-span-2 mt-4">
                <button 
                  type="submit" 
                  disabled={submitLoading}
                  className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitLoading ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-800 bg-slate-50">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-indigo-800 bg-indigo-50">Description</th>
                <th className="px-4 py-3 text-sm font-semibold text-emerald-800 bg-emerald-50">Price</th>
                <th className="px-4 py-3 text-sm font-semibold text-orange-800 bg-orange-50">Stock</th>
                {role === 'member' && <th className="px-4 py-3 text-sm font-semibold text-blue-800 bg-blue-50 text-center">Action</th>}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={role === 'member' ? "5" : "4"} className="text-center py-8 text-slate-500">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={role === 'member' ? "5" : "4"} className="text-center py-8 text-slate-500">No products found.</td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-emerald-500 hover:text-emerald-600 font-medium"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatRupiah(item.price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.stock > 10 ? (
                        item.stock
                      ) : (
                        <span className="text-red-500 font-semibold">
                          {item.stock} (Sisa {item.stock})
                        </span>
                      )}
                    </td>
                    {role === 'member' && (
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleBuy(item)}
                          disabled={item.stock < 1}
                          className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {item.stock > 0 ? "Beli Sekarang" : "Habis"}
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
