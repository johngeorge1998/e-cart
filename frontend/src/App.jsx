import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import CreateProductForm from "./components/CreateProductForm";

function App() {
  const path = useLocation();
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    const isProtectedRoute = !["/login", "/signup", "/"].includes(
      path.pathname
    );
    if (isProtectedRoute) {
      checkAuth();
    }
  }, [checkAuth, path.pathname]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [getCartItems, user]);

  if (checkingAuth && !["/login", "/signup", "/"].includes(path.pathname)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#f5f5f5]" />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <ScrollToTop />

        {path.pathname === "/login" || path.pathname === "/signup" ? (
          ""
        ) : (
          <Navbar />
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />

          <Route path="/category/:category" element={<CategoryPage />} />

          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/product"
            element={user ? <CreateProductForm /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
