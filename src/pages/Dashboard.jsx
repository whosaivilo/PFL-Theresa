import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaEllipsisV,
  FaStar,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { role, profile, session, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [memberOrders, setMemberOrders] = useState([]);

  useEffect(() => {
    if (!authLoading) {
      if (role === 'member') {
        fetchMemberOrders();
      } else {
        setLoading(false);
      }
    }
  }, [role, authLoading]);

  const fetchMemberOrders = async () => {
    try {
      setLoading(true);
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*, order_items(*, products(name))')
        .eq('user_id', session?.user?.id) // Use session from context
        .order('created_at', { ascending: false });
      
      if (!ordersError && ordersData) {
        setMemberOrders(ordersData);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const donutCharts = [
    { label: "Total Order", value: 81, color: "text-red-500", stroke: 251 * 0.81 },
    { label: "Customer Growth", value: 22, color: "text-green-500", stroke: 251 * 0.22 },
    { label: "Total Revenue", value: 62, color: "text-blue-500", stroke: 251 * 0.62 },
  ];

  const getTierColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'gold': return 'bg-gradient-to-r from-amber-200 to-yellow-500 text-amber-900 border-amber-300';
      case 'silver': return 'bg-gradient-to-r from-slate-200 to-gray-400 text-slate-800 border-slate-300';
      case 'bronze': return 'bg-gradient-to-r from-orange-200 to-amber-700 text-orange-900 border-orange-300';
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // --- MEMBER DASHBOARD ---
  if (role === 'member') {
    return (
      <div className="min-h-screen bg-slate-50 pb-10">
        <PageHeader title="Member Dashboard" breadcrumb={["Dashboard", "My Profile"]} />
        
        <div className="p-5 max-w-5xl mx-auto">
          {/* DIGITAL MEMBER CARD */}
          <div className={`p-8 rounded-2xl shadow-lg border relative overflow-hidden mb-8 ${getTierColor(profile?.tier)}`}>
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">Member Card</h3>
                <h2 className="text-3xl font-extrabold mb-4">{profile?.full_name}</h2>
                <div className="flex gap-4 items-center">
                  <div className="bg-white/30 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm border border-white/20">
                    <p className="text-xs font-bold opacity-80">Poin Aktif</p>
                    <p className="text-xl font-black">{profile?.points} Poin</p>
                  </div>
                  <div className="bg-white/30 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm border border-white/20 flex items-center gap-2">
                    <FaStar className="text-lg" />
                    <div>
                      <p className="text-xs font-bold opacity-80">Tier</p>
                      <p className="text-lg font-black">{profile?.tier}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Dekorasi Card */}
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute right-20 -bottom-20 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          </div>

          {/* RIWAYAT PESANAN */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
            <h2 className="text-xl font-bold mb-6 text-slate-700">Riwayat Pesanan Anda</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Tanggal</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Total</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Poin Didapat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {memberOrders.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-slate-500">Belum ada pesanan.</td>
                    </tr>
                  ) : (
                    memberOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">
                          {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border 
                            ${order.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' : 
                              order.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">
                          {formatRupiah(order.total_amount)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600">
                          +{order.points_earned} Poin
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD ---
  return (
    <div id="dashboard-container" className="min-h-screen bg-slate-50 pb-10">
      <PageHeader
        title="Dashboard Admin"
        breadcrumb="Dashboard / Overview"
      />

      <div
        id="dashboard-grid"
        className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <div className="bg-green-500 rounded-full p-4 text-3xl text-white">
            <FaShoppingCart />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800">75</span>
            <span className="text-sm text-slate-400 font-medium">
              Total Orders
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <div className="bg-blue-500 rounded-full p-4 text-3xl text-white">
            <FaTruck />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800">175</span>
            <span className="text-sm text-slate-400 font-medium">
              Total Delivered
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <div className="bg-red-500 rounded-full p-4 text-3xl text-white">
            <FaBan />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800">40</span>
            <span className="text-sm text-slate-400 font-medium">
              Total Canceled
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <div className="bg-yellow-400 rounded-full p-4 text-3xl text-white">
            <FaDollarSign />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800">Rp.11T</span>
            <span className="text-sm text-slate-400 font-medium">
              Total Revenue
            </span>
          </div>
        </div>
      </div>

      {/* --- BAGIAN GRAFIK (MENGGUNAKAN SVG MURNI) --- */}
      <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. PIE/DONUT CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Pie Chart</h2>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <FaEllipsisV />
            </div>
          </div>

          <div className="flex justify-around items-center h-48">
            {donutCharts.map((chart, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-100"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - chart.stroke}
                      strokeLinecap="round"
                      className={chart.color}
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-slate-700">
                    {chart.value}%
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-4 text-center">
                  {chart.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. AREA CHART (SVG PATH) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Chart Order</h2>
              <p className="text-xs text-slate-400 mt-1">
                Data mingguan pesanan selesai
              </p>
            </div>
            <button className="px-3 py-1.5 border border-blue-200 text-blue-500 text-xs font-semibold rounded-lg hover:bg-blue-50">
              Save Report
            </button>
          </div>

          <div className="relative h-48 w-full mt-4">
            <svg
              className="w-full h-full"
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
            >
              {/* Gradasi Area */}
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#3b82f6", stopOpacity: 0.2 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#3b82f6", stopOpacity: 0 }}
                  />
                </linearGradient>
              </defs>
              {/* Area Fill */}
              <path
                d="M0,80 Q50,90 100,60 T200,70 T300,20 T400,50 L400,100 L0,100 Z"
                fill="url(#grad)"
              />
              {/* Line Path */}
              <path
                d="M0,80 Q50,90 100,60 T200,70 T300,20 T400,50"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Titik Penanda (Dot) */}
              <circle cx="300" cy="20" r="4" fill="#3b82f6" />
            </svg>

            {/* Label Sumbu X (Hari) */}
            <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

