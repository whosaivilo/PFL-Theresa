import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar />

        <div className="flex-1 p-4">
          <Header />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route
              path="/error-400"
              element={
                <ErrorPage
                  code="400"
                  description="Bad Request. Permintaan tidak dapat diproses."
                  image="https://cdn-icons-png.flaticon.com/512/1046/1046771.png"
                />
              }
            />
            <Route
              path="/error-401"
              element={
                <ErrorPage
                  code="401"
                  description="Unauthorized. Anda tidak memiliki akses ke halaman ini."
                  image="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                />
              }
            />
            <Route
              path="/error-403"
              element={
                <ErrorPage
                  code="403"
                  description="Forbidden. Akses ditolak oleh sistem."
                  image="https://cdn-icons-png.flaticon.com/512/2927/2927347.png"
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
