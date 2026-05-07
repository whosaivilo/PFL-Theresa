import { useState } from "react";
import PageHeader from "../components/PageHeader";
import allData from "../dummyData.json";

export default function Orders() {
  const [isAdding, setIsAdding] = useState(false);
  const orders = allData.orderData;

  // --- LOGIKA AUTO-GENERATE ORDER ID ---
  const lastOrder = orders[orders.length - 1];
  const lastIdNumber = parseInt(lastOrder.id.split('-')[1]);
  const nextOrderId = `ORD-${String(lastIdNumber + 1).padStart(3, '0')}`;

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10 font-poppins">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order List"]}>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-hijau text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-green-600 transition-all"
        >
          {isAdding ? "Back to List" : "Add New Order"}
        </button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-8">
          {isAdding ? (
            <div id="form-order">
               <h2 className="text-xl font-bold mb-6 text-slate-700">Form Add New Order</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Order ID (Auto)</label>
                   {/* DIBUAT READONLY BIAR GAK BISA DIUBAH USER */}
                   <input 
                     type="text" 
                     value={nextOrderId} 
                     readOnly 
                     className="p-3 border border-slate-100 bg-slate-50 text-slate-400 rounded-xl outline-none cursor-not-allowed" 
                   />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Customer Name</label>
                   <input type="text" placeholder="Masukkan nama pelanggan" className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Status Order</label>
                   <select className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white">
                     <option value="Pending">Pending</option>
                     <option value="Completed">Completed</option>
                     <option value="Cancelled">Cancelled</option>
                   </select>
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Total Price</label>
                   <input type="text" placeholder="Rp 0" className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Order Date</label>
                   {/* Kasih default date hari ini biar makin otomatis */}
                   <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                 </div>
               </div>

               <div className="mt-8">
                 <button className="bg-hijau text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-600 transition-all active:scale-95">
                   Save Order Data
                 </button>
               </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
               {/* ... (Isi tabel tetap sama seperti sebelumnya) ... */}
               <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-400">#{order.id.split('-')[1]}</td>
                    <td className="px-6 py-4"><span className="text-sm font-semibold text-slate-700">{order.name}</span></td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700">{order.price}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}