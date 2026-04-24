import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaEllipsisV } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {

    const donutCharts = [
        { label: "Total Order", value: 81, color: "text-red-500", stroke: 251 * 0.81 },
        { label: "Customer Growth", value: 22, color: "text-green-500", stroke: 251 * 0.22 },
        { label: "Total Revenue", value: 62, color: "text-blue-500", stroke: 251 * 0.62 },
    ];

    return (
        <div id="dashboard-container" className="min-h-screen bg-slate-50 pb-10">
            <PageHeader />
            
            
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
                    <div className="bg-green-500 rounded-full p-4 text-3xl text-white"><FaShoppingCart /></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-800">75</span>
                        <span className="text-sm text-slate-400 font-medium">Total Orders</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
                    <div className="bg-blue-500 rounded-full p-4 text-3xl text-white"><FaTruck /></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-800">175</span>
                        <span className="text-sm text-slate-400 font-medium">Total Delivered</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
                    <div className="bg-red-500 rounded-full p-4 text-3xl text-white"><FaBan /></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-800">40</span>
                        <span className="text-sm text-slate-400 font-medium">Total Canceled</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
                    <div className="bg-yellow-400 rounded-full p-4 text-3xl text-white"><FaDollarSign /></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-800">Rp.11T</span>
                        <span className="text-sm text-slate-400 font-medium">Total Revenue</span>
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
                                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                                        {/* Progress Circle */}
                                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                            strokeDasharray="251.2" 
                                            strokeDashoffset={251.2 - chart.stroke} 
                                            strokeLinecap="round"
                                            className={chart.color} 
                                        />
                                    </svg>
                                    <span className="absolute text-sm font-bold text-slate-700">{chart.value}%</span>
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-4 text-center">{chart.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. AREA CHART (SVG PATH) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Chart Order</h2>
                            <p className="text-xs text-slate-400 mt-1">Data mingguan pesanan selesai</p>
                        </div>
                        <button className="px-3 py-1.5 border border-blue-200 text-blue-500 text-xs font-semibold rounded-lg hover:bg-blue-50">
                            Save Report
                        </button>
                    </div>

                    <div className="relative h-48 w-full mt-4">
                        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                            {/* Gradasi Area */}
                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:0.2}} />
                                    <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:0}} />
                                </linearGradient>
                            </defs>
                            {/* Area Fill */}
                            <path d="M0,80 Q50,90 100,60 T200,70 T300,20 T400,50 L400,100 L0,100 Z" fill="url(#grad)" />
                            {/* Line Path */}
                            <path d="M0,80 Q50,90 100,60 T200,70 T300,20 T400,50" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                            {/* Titik Penanda (Dot) */}
                            <circle cx="300" cy="20" r="4" fill="#3b82f6" />
                        </svg>
                        
                        {/* Label Sumbu X (Hari) */}
                        <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
                            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}