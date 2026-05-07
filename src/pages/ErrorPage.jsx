
import { Link } from "react-router-dom";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center font-poppins">
      {/* <img src={image || "https://via.placeholder.com/300"} alt="Error Illustration" className="w-64 mb-6" /> */}
      <h1 className="text-8xl font-black text-gray-200">{code}</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-2">Ups! Terjadi Kesalahan .</h2>
      <p className="text-gray-400 mt-2 max-w-sm">{description}</p>
      <Link to="/" className="mt-6 rounded-xl bg-hijau px-6 py-3 font-bold text-white shadow-lg hover:bg-green-600 transition-all">
        Kembali ke Dashboard
      </Link>
    </div>
  );
}