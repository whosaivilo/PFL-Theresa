import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-10 text-center font-poppins">
      {/* Ilustrasi atau Angka Besar */}
      <h1 className="text-[120px] font-extrabold text-gray-200 leading-none">
        404
      </h1>
      
      {/* Judul */}
      <h2 className="mt-4 text-3xl font-bold text-gray-900">
        Halaman Tidak Ditemukan{" "}
        <b className="text-hijau">.</b>
      </h2>
      <Link to="/" className="mt-6 rounded-xl bg  -hijau px-6 py-3 font-bold text-white shadow-lg hover:bg-green-600 transition-all">
        Kembali ke Dashboard
      </Link>
      
      

      

    
    </div>
  );
}