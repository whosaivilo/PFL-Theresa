import { useState } from "react"; 
import PageHeader from "../components/PageHeader";
import allData from "../dummyData.json";

export default function Customers() {
  const [isAdding, setIsAdding] = useState(false);
  const customers = allData.customerData;

  // --- LOGIKA AUTO-GENERATE CUSTOMER ID ---
  const lastCustomer = customers[customers.length - 1];
  const lastIdNumber = parseInt(lastCustomer.id.split('-')[1]);
  const nextCustomerId = `CUST-${String(lastIdNumber + 1).padStart(3, '0')}`;

  // Fungsi untuk menentukan warna badge loyalty
  const getLoyaltyStyle = (loyalty) => {
    switch (loyalty.toLowerCase()) {
      case 'gold':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'silver':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'bronze':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10 font-poppins">
      <PageHeader title="Customer" breadcrumb={["Dashboard", "Customer List"]}>
        {/* Tombol dimasukkan sebagai children agar muncul di PageHeader */}
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-hijau text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-green-600 transition-all"
        >
          {isAdding ? "Back to List" : "Add New Customer"}
        </button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-8">
          
          {isAdding ? (
            <div id="form-customer">
               <h2 className="text-xl font-bold mb-6 text-slate-700">Form Add New Customer</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Customer ID (Auto)</label>
                   <input 
                     type="text" 
                     value={nextCustomerId} 
                     readOnly 
                     className="p-3 border border-slate-100 bg-slate-50 text-slate-400 rounded-xl outline-none cursor-not-allowed" 
                   />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Full Name</label>
                   <input type="text" placeholder="Masukkan nama lengkap" className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Email Address</label>
                   <input type="email" placeholder="contoh@mail.com" className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Phone Number</label>
                   <input type="text" placeholder="0812..." className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Loyalty Level</label>
                   <select className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white">
                     <option value="Bronze">Bronze</option>
                     <option value="Silver">Silver</option>
                     <option value="Gold">Gold</option>
                   </select>
                 </div>
               </div>

               <div className="mt-8">
                 <button className="bg-hijau text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-600 transition-all active:scale-95">
                   Save Customer Data
                 </button>
               </div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Loyalty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-400">
                      #{cust.id.split('-')[1]}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-700 block">
                        {cust.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {cust.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {cust.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getLoyaltyStyle(cust.loyalty)}`}>
                        {cust.loyalty}
                      </span>
                    </td>
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