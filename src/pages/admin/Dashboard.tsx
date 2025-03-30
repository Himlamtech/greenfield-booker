
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, CalendarIcon, ShoppingCartIcon } from "lucide-react";

const Dashboard = () => {
  const [periodType, setPeriodType] = useState<"day" | "week" | "month" | "year">("week");
  const [comparePeriod, setComparePeriod] = useState(false);
  
  // Dữ liệu thống kê giả định
  const stats = {
    totalBookings: 128,
    totalIncome: 42500000,
    productSales: 56,
    compareData: {
      day: {
        current: 1500000,
        previous: 1200000
      },
      week: {
        current: 8500000,
        previous: 7200000
      },
      month: {
        current: 38500000,
        previous: 32800000
      },
      year: {
        current: 425000000,
        previous: 380000000
      }
    }
  };
  
  // Dữ liệu biểu đồ theo thời gian
  const getChartData = () => {
    switch(periodType) {
      case "day":
        return [
          { name: '6h', value: 320000 },
          { name: '8h', value: 180000 },
          { name: '10h', value: 150000 },
          { name: '12h', value: 380000 },
          { name: '14h', value: 220000 },
          { name: '16h', value: 320000 },
          { name: '18h', value: 650000 },
          { name: '20h', value: 820000 },
        ];
      case "week":
        return [
          { name: 'T2', value: 1200000 },
          { name: 'T3', value: 980000 },
          { name: 'T4', value: 1380000 },
          { name: 'T5', value: 1520000 },
          { name: 'T6', value: 1650000 },
          { name: 'T7', value: 1850000 },
          { name: 'CN', value: 1420000 },
        ];
      case "month":
        return [
          { name: 'Tuần 1', value: 7500000 },
          { name: 'Tuần 2', value: 8300000 },
          { name: 'Tuần 3', value: 9200000 },
          { name: 'Tuần 4', value: 10500000 },
        ];
      case "year":
        return [
          { name: 'T1', value: 32000000 },
          { name: 'T2', value: 28000000 },
          { name: 'T3', value: 34000000 },
          { name: 'T4', value: 32000000 },
          { name: 'T5', value: 35000000 },
          { name: 'T6', value: 38000000 },
          { name: 'T7', value: 42000000 },
          { name: 'T8', value: 45000000 },
          { name: 'T9', value: 40000000 },
          { name: 'T10', value: 38000000 },
          { name: 'T11', value: 43000000 },
          { name: 'T12', value: 48000000 },
        ];
      default:
        return [];
    }
  };
  
  // Dữ liệu so sánh với kỳ trước đó
  const compareData = stats.compareData[periodType];
  const percentChange = ((compareData.current - compareData.previous) / compareData.previous) * 100;
  const chartData = getChartData();
  
  // Dữ liệu lịch đặt sân sắp tới
  const upcomingBookings = [
    { id: 1, customer: 'Nguyễn Văn A', phone: '0901234567', field: 'Sân A', date: 'Hôm nay', time: '17:00 - 18:00', price: 350000, status: 'paid' },
    { id: 2, customer: 'Trần Văn B', phone: '0912345678', field: 'Sân B', date: 'Hôm nay', time: '18:00 - 19:00', price: 350000, status: 'deposit' },
    { id: 3, customer: 'Lê Văn C', phone: '0923456789', field: 'Sân C', date: 'Hôm nay', time: '19:00 - 20:00', price: 350000, status: 'pending' },
    { id: 4, customer: 'Phạm Văn D', phone: '0934567890', field: 'Sân D', date: 'Ngày mai', time: '17:00 - 18:00', price: 350000, status: 'paid' },
    { id: 5, customer: 'Hoàng Văn E', phone: '0945678901', field: 'Sân A', date: 'Ngày mai', time: '18:00 - 19:00', price: 350000, status: 'deposit' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Thống kê tổng quan</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Chart with Period Selection */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-lg font-semibold">Biểu đồ doanh thu</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-0">
              <Tabs defaultValue="week" value={periodType} onValueChange={(v) => setPeriodType(v as "day" | "week" | "month" | "year")}>
                <TabsList>
                  <TabsTrigger value="day">Ngày</TabsTrigger>
                  <TabsTrigger value="week">Tuần</TabsTrigger>
                  <TabsTrigger value="month">Tháng</TabsTrigger>
                  <TabsTrigger value="year">Năm</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Select 
                defaultValue="current" 
                onValueChange={(v) => setComparePeriod(v === "compare")}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Chọn kỳ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Kỳ hiện tại</SelectItem>
                  <SelectItem value="compare">So sánh với kỳ trước</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* So sánh với kỳ trước */}
          {comparePeriod && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Kỳ hiện tại</p>
                  <p className="text-lg font-semibold">{compareData.current.toLocaleString()} đ</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kỳ trước</p>
                  <p className="text-lg font-semibold">{compareData.previous.toLocaleString()} đ</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Thay đổi</p>
                  <p className={`text-lg font-semibold ${percentChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {percentChange >= 0 ? "+" : ""}{percentChange.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}
          
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
                  <div className="text-[10px] text-gray-500">{(item.value/1000).toFixed(0)}k</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      {/* Upcoming Bookings Calendar */}
      <Card className="mt-6 p-6">
        <h2 className="text-lg font-semibold mb-4">Lịch đặt sân sắp tới</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium text-gray-500 border-b">
                <th className="pb-2 text-left">Khách hàng</th>
                <th className="pb-2 text-left">Sân</th>
                <th className="pb-2 text-left">Thời gian</th>
                <th className="pb-2 text-left">Ngày</th>
                <th className="pb-2 text-left">Giá</th>
                <th className="pb-2 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {upcomingBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3">
                    <div className="font-medium">{booking.customer}</div>
                    <div className="text-xs text-gray-500">{booking.phone}</div>
                  </td>
                  <td className="py-3">{booking.field}</td>
                  <td className="py-3">{booking.time}</td>
                  <td className="py-3">{booking.date}</td>
                  <td className="py-3">{booking.price.toLocaleString()}đ</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'paid' ? "bg-green-100 text-green-800" : 
                      booking.status === 'deposit' ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {booking.status === 'paid' ? "Đã thanh toán" : 
                       booking.status === 'deposit' ? "Đã đặt cọc" : "Chờ thanh toán"}
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
