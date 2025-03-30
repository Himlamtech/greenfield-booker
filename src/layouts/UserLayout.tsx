
import { Outlet, NavLink, Link } from "react-router-dom";
import { Home, Calendar, Users, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col field-gradient">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-field-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">SB</span>
              </div>
              <span className="text-field-700 font-bold text-xl hidden sm:inline-block">
                Sân Bóng Xanh
              </span>
            </Link>

            {/* Main Navigation */}
            <nav className="flex items-center">
              <ul className="flex space-x-1 sm:space-x-2">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "nav-link flex items-center gap-1",
                        isActive ? "active" : ""
                      )
                    }
                    end
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline-block">Trang chủ</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dat-san"
                    className={({ isActive }) =>
                      cn(
                        "nav-link flex items-center gap-1",
                        isActive ? "active" : ""
                      )
                    }
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="hidden sm:inline-block">Đặt sân</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/giao-luu"
                    className={({ isActive }) =>
                      cn(
                        "nav-link flex items-center gap-1",
                        isActive ? "active" : ""
                      )
                    }
                  >
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline-block">Giao lưu</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dich-vu"
                    className={({ isActive }) =>
                      cn(
                        "nav-link flex items-center gap-1",
                        isActive ? "active" : ""
                      )
                    }
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline-block">Dịch vụ</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-field-800 text-white mt-auto">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sân Bóng Xanh</h3>
              <p className="mb-2">
                Địa chỉ: 123 Đường Lê Lợi, Quận 1, TP.HCM
              </p>
              <p className="mb-2">Điện thoại: 0123 456 789</p>
              <p>Email: info@sanbongxanh.vn</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Giờ hoạt động</h3>
              <p className="mb-2">Thứ 2 - Thứ 6: 6:00 - 22:00</p>
              <p>Thứ 7 - Chủ nhật: 6:00 - 23:00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kết nối</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-field-300 transition-colors">
                  Facebook
                </a>
                <a href="#" className="hover:text-field-300 transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-field-300 transition-colors">
                  Youtube
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-field-700 text-center">
            <p>&copy; {new Date().getFullYear()} Sân Bóng Xanh. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
