
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User Pages
import Home from "./pages/user/Home";
import BookingField from "./pages/user/BookingField";
import FindOpponents from "./pages/user/FindOpponents";
import Services from "./pages/user/Services";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import FieldManagement from "./pages/admin/FieldManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import Feedback from "./pages/admin/Feedback";

// Not Found Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component để tải Google Maps API
const GoogleMapsLoader = () => {
  useEffect(() => {
    // Kiểm tra xem script đã được tải chưa
    if (!document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBnigY9gkLxKhMdVoqUeCHUTOypSoeVz3I&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleMapsLoader />
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="dat-san" element={<BookingField />} />
          <Route path="giao-luu" element={<FindOpponents />} />
          <Route path="dich-vu" element={<Services />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="quan-ly-san" element={<FieldManagement />} />
          <Route path="quan-ly-san-pham" element={<ProductManagement />} />
          <Route path="phan-hoi" element={<Feedback />} />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
