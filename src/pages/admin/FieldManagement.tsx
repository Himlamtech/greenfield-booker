
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

interface TimeSlot {
  id: number;
  time: string;
  weekdayPrice: number;
  weekendPrice: number;
}

interface Booking {
  id: number;
  fieldId: number;
  customerName: string;
  phone: string;
  date: Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price: number;
}

const timeSlots: TimeSlot[] = [
  { id: 1, time: "06:00 - 07:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 2, time: "07:00 - 08:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 3, time: "08:00 - 09:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 4, time: "09:00 - 10:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 5, time: "10:00 - 11:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 6, time: "11:00 - 12:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 7, time: "12:00 - 13:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 8, time: "13:00 - 14:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 9, time: "14:00 - 15:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 10, time: "15:00 - 16:00", weekdayPrice: 200000, weekendPrice: 250000 },
  { id: 11, time: "16:00 - 17:00", weekdayPrice: 250000, weekendPrice: 300000 },
  { id: 12, time: "17:00 - 18:00", weekdayPrice: 350000, weekendPrice: 400000 },
  { id: 13, time: "18:00 - 19:00", weekdayPrice: 350000, weekendPrice: 400000 },
  { id: 14, time: "19:00 - 20:00", weekdayPrice: 350000, weekendPrice: 400000 },
  { id: 15, time: "20:00 - 21:00", weekdayPrice: 350000, weekendPrice: 400000 },
  { id: 16, time: "21:00 - 22:00", weekdayPrice: 300000, weekendPrice: 350000 },
];

// Dữ liệu đặt sân giả định
const generateBookings = (): Booking[] => {
  const bookings: Booking[] = [];
  const statuses: ("pending" | "confirmed" | "completed" | "cancelled")[] = [
    "pending", "confirmed", "completed", "cancelled"
  ];
  
  for (let i = 1; i <= 20; i++) {
    const fieldId = Math.floor(Math.random() * 4) + 1; // 1-4
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 14) - 7); // +/- 7 days
    
    const timeSlotIndex = Math.floor(Math.random() * timeSlots.length);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const price = Math.random() > 0.5 ? timeSlots[timeSlotIndex].weekdayPrice : timeSlots[timeSlotIndex].weekendPrice;
    
    bookings.push({
      id: i,
      fieldId,
      customerName: `Khách hàng ${i}`,
      phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
      date,
      timeSlot: timeSlots[timeSlotIndex].time,
      status,
      price
    });
  }
  
  return bookings;
};

const fields = [
  { id: 1, name: "Sân A", type: "Sân 5 người" },
  { id: 2, name: "Sân B", type: "Sân 5 người" },
  { id: 3, name: "Sân C", type: "Sân 7 người" },
  { id: 4, name: "Sân D", type: "Sân 7 người" },
];

const FieldManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("1"); // Default is Sân A
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookings, setBookings] = useState<Booking[]>(generateBookings());
  const [editingTimeSlot, setEditingTimeSlot] = useState<TimeSlot | null>(null);
  const [weekdayPrice, setWeekdayPrice] = useState<string>("");
  const [weekendPrice, setWeekendPrice] = useState<string>("");
  
  const { toast } = useToast();
  
  const filteredBookings = bookings.filter(
    booking => 
      booking.fieldId === parseInt(activeTab) && 
      format(booking.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  ).sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
  
  const handleUpdatePrice = () => {
    if (!editingTimeSlot) return;
    
    const updatedTimeSlots = timeSlots.map(slot => 
      slot.id === editingTimeSlot.id
        ? { 
            ...slot, 
            weekdayPrice: parseInt(weekdayPrice) || slot.weekdayPrice,
            weekendPrice: parseInt(weekendPrice) || slot.weekendPrice
          }
        : slot
    );
    
    // In a real app, this would update the backend
    toast({
      title: "Cập nhật giá thành công",
      description: `Khung giờ ${editingTimeSlot.time} đã được cập nhật.`,
    });
    
    setEditingTimeSlot(null);
    setWeekdayPrice("");
    setWeekendPrice("");
  };
  
  const handleStatusChange = (bookingId: number, newStatus: "pending" | "confirmed" | "completed" | "cancelled") => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
    
    toast({
      title: "Cập nhật trạng thái đặt sân",
      description: `Trạng thái đã được cập nhật thành ${
        newStatus === "pending" ? "Chờ xác nhận" :
        newStatus === "confirmed" ? "Đã xác nhận" :
        newStatus === "completed" ? "Hoàn thành" : "Đã hủy"
      }`,
    });
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý sân bóng</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Price Management */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quản lý giá sân</h2>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-3 bg-gray-50 p-3 font-medium text-sm border-b">
                  <div>Khung giờ</div>
                  <div>Giá ngày thường</div>
                  <div>Giá cuối tuần</div>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <div 
                      key={slot.id} 
                      className="grid grid-cols-3 p-3 border-b last:border-b-0 items-center text-sm hover:bg-gray-50"
                    >
                      <div>{slot.time}</div>
                      <div>{slot.weekdayPrice.toLocaleString()}đ</div>
                      <div className="flex items-center justify-between">
                        <span>{slot.weekendPrice.toLocaleString()}đ</span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setEditingTimeSlot(slot)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Cập nhật giá sân</DialogTitle>
                              <DialogDescription>
                                Chỉnh sửa giá cho khung giờ {slot.time}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <p className="text-right col-span-1">Ngày thường:</p>
                                <div className="col-span-3">
                                  <Input
                                    type="number"
                                    placeholder={slot.weekdayPrice.toString()}
                                    value={weekdayPrice}
                                    onChange={(e) => setWeekdayPrice(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <p className="text-right col-span-1">Cuối tuần:</p>
                                <div className="col-span-3">
                                  <Input
                                    type="number"
                                    placeholder={slot.weekendPrice.toString()}
                                    value={weekendPrice}
                                    onChange={(e) => setWeekendPrice(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                className="bg-field-600 hover:bg-field-700"
                                onClick={handleUpdatePrice}
                              >
                                Cập nhật
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Panel - Booking Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quản lý đặt sân</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Field Selection */}
                <Tabs 
                  defaultValue="1" 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="space-y-4"
                >
                  <TabsList>
                    {fields.map((field) => (
                      <TabsTrigger key={field.id} value={field.id.toString()}>
                        {field.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                
                {/* Date Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left ml-auto"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "dd/MM/yyyy")
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                      locale={vi}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Bookings Table */}
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-gray-50 p-3 text-sm font-medium border-b">
                  <div className="col-span-2">Khách hàng</div>
                  <div>Giờ</div>
                  <div>Giá</div>
                  <div>Trạng thái</div>
                  <div>Thao tác</div>
                </div>
                
                <div className="divide-y">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <div key={booking.id} className="grid grid-cols-6 p-3 items-center text-sm">
                        <div className="col-span-2">
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-xs text-gray-500">{booking.phone}</p>
                        </div>
                        <div>{booking.timeSlot}</div>
                        <div>{booking.price.toLocaleString()}đ</div>
                        <div>
                          <Badge className={`
                            ${booking.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                            ${booking.status === "confirmed" ? "bg-blue-100 text-blue-800" : ""}
                            ${booking.status === "completed" ? "bg-green-100 text-green-800" : ""}
                            ${booking.status === "cancelled" ? "bg-red-100 text-red-800" : ""}
                          `}>
                            {booking.status === "pending" && "Chờ xác nhận"}
                            {booking.status === "confirmed" && "Đã xác nhận"}
                            {booking.status === "completed" && "Hoàn thành"}
                            {booking.status === "cancelled" && "Đã hủy"}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8"
                            onClick={() => handleStatusChange(booking.id, "confirmed")}
                          >
                            Xác nhận
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleStatusChange(booking.id, "cancelled")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      Không có đặt sân cho ngày và sân đã chọn
                    </div>
                  )}
                </div>
              </div>
              
              {/* Manual Booking Button */}
              <Button className="mt-6 bg-field-600 hover:bg-field-700">
                Thêm đặt sân mới
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FieldManagement;
