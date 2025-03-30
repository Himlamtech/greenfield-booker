
import { Outlet, NavLink } from "react-router-dom";
import { BarChart, Calendar, ShoppingCart, FileText, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-field-800 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
          <p className="text-field-300 text-sm">Sân Bóng Xanh</p>
        </div>
        <nav className="mt-6">
          <ul className="space-y-1 px-4">
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-field-700 text-white"
                      : "text-field-100 hover:bg-field-700"
                  )
                }
              >
                <BarChart className="w-5 h-5" />
                <span>Thống kê</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/quan-ly-san"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-field-700 text-white"
                      : "text-field-100 hover:bg-field-700"
                  )
                }
              >
                <Calendar className="w-5 h-5" />
                <span>Quản lý sân bóng</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/quan-ly-san-pham"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-field-700 text-white"
                      : "text-field-100 hover:bg-field-700"
                  )
                }
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Quản lý sản phẩm</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/phan-hoi"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-field-700 text-white"
                      : "text-field-100 hover:bg-field-700"
                  )
                }
              >
                <FileText className="w-5 h-5" />
                <span>Phản hồi khách hàng</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">{admin?.email}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
