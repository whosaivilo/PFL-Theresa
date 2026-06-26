import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles(full_name),
          order_items(quantity, products(name, id))
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (orderId) => {
    if (!window.confirm("Verifikasi pesanan ini? Status akan menjadi completed.")) return;
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderId);
      
      if (error) throw error;
      alert("Pesanan berhasil diverifikasi!");
      fetchOrders();
    } catch (error) {
      console.error("Error verifying order:", error);
      alert("Gagal memverifikasi pesanan");
    }
  };

  const handleReject = async (order) => {
    if (!window.confirm("Batalkan pesanan ini? Stok produk akan dikembalikan.")) return;
    try {
      // 1. Ubah status jadi cancelled
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('id', order.id);
      
      if (updateError) throw updateError;

      // 2. Kembalikan stok (asumsi order cuma punya 1 tipe produk untuk mempermudah, sesuai handleBuy)
      const item = order.order_items[0];
      if (item && item.products) {
        // Ambil stok saat ini
        const { data: prodData } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.products.id)
          .single();

        if (prodData) {
          await supabase
            .from('products')
            .update({ stock: prodData.stock + item.quantity })
            .eq('id', item.products.id);
        }
      }

      alert("Pesanan dibatalkan dan stok dikembalikan.");
      fetchOrders();
    } catch (error) {
      console.error("Error rejecting order:", error);
      alert("Gagal membatalkan pesanan");
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka || 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10 font-poppins">
      <PageHeader title="Orders Management" breadcrumb={["Dashboard", "Order List"]} />

      <div className="p-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-700">Daftar Pesanan Masuk</h2>
            <p className="text-sm text-slate-500">Verifikasi pesanan member di sini.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Produk</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Harga</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-8">Loading orders...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-8 text-slate-500">Belum ada pesanan masuk.</td></tr>
                ) : (
                  orders.map((order) => {
                    const itemName = order.order_items?.[0]?.products?.name || '-';
                    const itemQty = order.order_items?.[0]?.quantity || 0;
                    
                    return (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">
                          {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-slate-700">
                            {order.profiles?.full_name || 'Member'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {itemName} (x{itemQty})
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">
                          {formatRupiah(order.total_amount)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.status === 'pending' ? (
                            <div className="flex gap-2 justify-center">
                              <button 
                                onClick={() => handleVerify(order.id)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all"
                              >
                                Verify
                              </button>
                              <button 
                                onClick={() => handleReject(order)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Selesai</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}