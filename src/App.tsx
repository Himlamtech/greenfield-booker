import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import { AuthProvider } from "./hooks/useAuth";

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

// Create a global type for the Google API
declare global {
  interface Window {
    google: any;
  }
}

// Component để tải Google Maps API
const GoogleMapsLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const apiKey = "AIzaSyBnigY9gkLxKhMdVoqUeCHUTOypSoeVz3I";

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      console.log("Google Maps API already loaded");
      setIsLoaded(true);
      return;
    }

    // Create script element
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Define callback function for Google Maps
    window.initMap = function() {
      console.log("Google Maps API loaded successfully via callback");
      setIsLoaded(true);
    };
    
    script.onload = () => {
      console.log("Google Maps script loaded");
    };
    
    script.onerror = (error) => {
      console.error("Error loading Google Maps API:", error);
    };
    
    // Add script to head
    document.head.appendChild(script);
    
    return () => {
      // Cleanup if needed
      if (window.initMap) {
        // @ts-ignore - remove the global callback
        window.initMap = undefined;
      }
    };
  }, [apiKey]);

  // Always render children even while loading to avoid white flash
  return <>{children}</>;
};

// Create queryClient outside of component to avoid recreation on re-render
const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GoogleMapsLoader>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <Sonner />
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
          </QueryClientProvider>
        </GoogleMapsLoader>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
