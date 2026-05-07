import PageHeader from "../components/PageHeader";
import allData from "../dummyData.json";

export default function Customers() {
  const customers = allData.customerData;

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
      <PageHeader
        title="Customer"
        breadcrumb="Dashboard / Customer List"
        buttonText="Add New Customer"
      />

      <div className="p-5">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
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
        </div>
      </div>
    </div>
  );
}