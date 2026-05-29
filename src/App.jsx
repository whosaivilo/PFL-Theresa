
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const NotFoundd = React.lazy(() => import("./pages/NotFoundd"))
const Products = React.lazy(() => import("./pages/Products"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const Components = React.lazy(() => import("./pages/Components"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))




function App() {
  return (
    	<Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/components" element={<Components />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
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
        <Route path="*" element={<NotFoundd />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
