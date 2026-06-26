import { useState, useEffect } from "react"; 
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export default function Customers() {
  const [isAdding, setIsAdding] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      alert("Gagal memuat data pelanggan");
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
      const { data, error } = await supabase
        .from('customers')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }])
        .select();

      if (error) throw error;
      
      alert("Berhasil menambahkan pelanggan!");
      setFormData({ name: "", email: "", phone: "" });
      setIsAdding(false);
      fetchCustomers();
    } catch (error) {
      console.error("Error inserting customer:", error);
      alert(error.message || "Gagal menambahkan pelanggan");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10 font-poppins">
      <PageHeader title="Customer" breadcrumb={["Dashboard", "Customer List"]}>
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
               
               <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Full Name</label>
                   <input 
                     type="text" 
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     required
                     placeholder="Masukkan nama lengkap" 
                     className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                   />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Email Address</label>
                   <input 
                     type="email" 
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     required
                     placeholder="contoh@mail.com" 
                     className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                   />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-600">Phone Number</label>
                   <input 
                     type="text" 
                     name="phone"
                     value={formData.phone}
                     onChange={handleInputChange}
                     placeholder="0812..." 
                     className="p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" 
                   />
                 </div>

                 <div className="col-span-1 md:col-span-2 mt-4">
                   <button 
                     type="submit" 
                     disabled={submitLoading}
                     className="bg-hijau text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-600 transition-all active:scale-95 disabled:opacity-50"
                   >
                     {submitLoading ? "Saving..." : "Save Customer Data"}
                   </button>
                 </div>
               </form>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-8 text-slate-500">Loading customers...</td>
                    </tr>
                  ) : customers.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-8 text-slate-500">No customers found.</td>
                    </tr>
                  ) : (
                    customers.map((cust) => (
                      <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-slate-700 block">
                            {cust.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {cust.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {cust.phone || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}