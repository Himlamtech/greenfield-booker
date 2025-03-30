
import { Card } from "@/components/ui/card";
import { BarChart, CalendarIcon, ShoppingCartIcon, Users } from "lucide-react";

const Dashboard = () => {
  // Dữ liệu thống kê giả định
  const stats = {
    totalBookings: 128,
    totalIncome: 42500000,
    productSales: 56,
    activeTeams: 24
  };
  
  // Dữ liệu biểu đồ giả định
  const chartData = [
    { name: 'T2', value: 3200000 },
    { name: 'T3', value: 4100000 },
    { name: 'T4', value: 3800000 },
    { name: 'T5', value: 5200000 },
    { name: 'T6', value: 6500000 },
    { name: 'T7', value: 8500000 },
    { name: 'CN', value: 7200000 },
  ];
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Thống kê tổng quan</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start">
            <div className="p-2 rounded-md bg-blue-100">
              <CalendarIcon className="w-7 h-7 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-muted-foreground">Đặt sân</p>
              <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
              <p className="text-xs text-green-600 mt-1">+8% so với tuần trước</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start">
            <div className="p-2 rounded-md bg-green-100">
              <BarChart className="w-7 h-7 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-muted-foreground">Doanh thu</p>
              <h3 className="text-2xl font-bold">{(stats.totalIncome/1000000).toLocaleString()}tr đ</h3>
              <p className="text-xs text-green-600 mt-1">+12% so với tuần trước</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start">
            <div className="p-2 rounded-md bg-yellow-100">
              <ShoppingCartIcon className="w-7 h-7 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-muted-foreground">Bán hàng</p>
              <h3 className="text-2xl font-bold">{stats.productSales}</h3>
              <p className="text-xs text-green-600 mt-1">+5% so với tuần trước</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-start">
            <div className="p-2 rounded-md bg-purple-100">
              <Users className="w-7 h-7 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-muted-foreground">Đội bóng hoạt động</p>
              <h3 className="text-2xl font-bold">{stats.activeTeams}</h3>
              <p className="text-xs text-green-600 mt-1">+3% so với tuần trước</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Doanh thu theo ngày trong tuần</h2>
          <div className="h-80">
            <div className="w-full h-full flex items-end">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full max-w-[60px] bg-field-600 rounded-t-md" 
                    style={{ 
                      height: `${(item.value / Math.max(...chartData.map(d => d.value))) * 80}%`,
                      opacity: 0.7 + (index / 10)
                    }}
                  ></div>
                  <div className="mt-2 text-xs font-medium">{item.name}</div>
                  <div className="text-[10px] text-gray-500">{(item.value/1000000).toFixed(1)}tr</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        {/* Recent Activities */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Hoạt động gần đây</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start pb-3 border-b border-gray-100 last:border-0">
                <div className={`w-2 h-2 mt-1.5 rounded-full ${
                  i % 3 === 0 ? "bg-green-500" : 
                  i % 3 === 1 ? "bg-blue-500" : "bg-yellow-500"
                }`}></div>
                <div className="ml-3">
                  <p className="text-sm">
                    {i % 3 === 0 ? "Đặt sân mới" : 
                     i % 3 === 1 ? "Đơn hàng mới" : "Đăng ký giao lưu mới"}
                  </p>
                  <p className="text-xs text-gray-500">30 phút trước</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Upcoming Bookings */}
      <Card className="mt-6 p-6">
        <h2 className="text-lg font-semibold mb-4">Lịch đặt sân sắp tới</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium text-gray-500 border-b">
                <th className="pb-2 text-left">Khách hàng</th>
                <th className="pb-2 text-left">Sân</th>
                <th className="pb-2 text-left">Thời gian</th>
                <th className="pb-2 text-left">Giá</th>
                <th className="pb-2 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="py-3">
                    <div className="font-medium">Nguyễn Văn A</div>
                    <div className="text-xs text-gray-500">0901234567</div>
                  </td>
                  <td className="py-3">Sân {String.fromCharCode(64 + (i % 4 + 1))}</td>
                  <td className="py-3">
                    <div>Hôm nay</div>
                    <div className="text-xs text-gray-500">{17 + i}:00 - {18 + i}:00</div>
                  </td>
                  <td className="py-3">{(250 + i * 20).toLocaleString()}k đ</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      i % 3 === 0 ? "bg-green-100 text-green-800" : 
                      i % 3 === 1 ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {i % 3 === 0 ? "Đã thanh toán" : 
                       i % 3 === 1 ? "Đã đặt cọc" : "Chờ thanh toán"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
