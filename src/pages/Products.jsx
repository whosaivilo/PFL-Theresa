import React from "react";
import PageHeader from "../components/PageHeader";
import dataProduk from "../Data/dataProduk.json";
import { Link } from 'react-router-dom';

export default function Products() {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div id="dashboard-container">
      <PageHeader title="Product" />

      <div className="mt-5 overflow-x-auto bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <table className="w-full text-left border-collapse">
          {/* Header tabel: Warna berbeda untuk setiap kolom (background soft, text gelap) */}
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-800 bg-slate-50">
                ID
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-blue-800 bg-blue-50">
                Title
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-indigo-800 bg-indigo-50">
                Code
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-purple-800 bg-purple-50">
                Category
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-pink-800 bg-pink-50">
                Brand
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-emerald-800 bg-emerald-50">
                Price
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-orange-800 bg-orange-50">
                Stock
              </th>
            </tr>
          </thead>

          <tbody>
            {dataProduk.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <Link
                    to={`/products/${item.id}`}
                    className="text-emerald-400 hover:text-emerald-500"
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                  {item.title}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.code}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.brand}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {formatRupiah(item.price)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.stock > 10 ? (
                    item.stock
                  ) : (
                    <span className="text-red-500 font-semibold">
                      {item.stock} (Sisa Sedikit!)
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
