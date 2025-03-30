import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    let checkInterval: NodeJS.Timeout;
    let errorTimeout: NodeJS.Timeout;
    
    // Function to initialize map once Google Maps is available
    const initializeMap = () => {
      if (!isMounted) return;
      
      if (window.google && window.google.maps) {
        console.log("Google Maps detected in Home component");
        setMapLoaded(true);
        clearInterval(checkInterval);
        clearTimeout(errorTimeout);
        initMap();
      }
    };
    
    // Start checking for Google Maps with shorter intervals
    checkInterval = setInterval(initializeMap, 300);
    
    // Set a timeout to show error if maps don't load after 15 seconds
    errorTimeout = setTimeout(() => {
      if (isMounted && !mapLoaded) {
        console.error("Google Maps failed to load after timeout");
        setMapError(true);
        clearInterval(checkInterval);
        toast({
          title: "Không thể tải Google Maps",
          description: "Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.",
          variant: "destructive"
        });
      }
    }, 15000);
    
    // Try to initialize immediately in case maps are already loaded
    initializeMap();
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearInterval(checkInterval);
      clearTimeout(errorTimeout);
    };
  }, [mapLoaded]);
  
  const initMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      console.error("Required dependencies for map not available");
      setMapError(true);
      return;
    }
    
    try {
      console.log("Initializing map in Home component");
      const location = { lat: 20.9732762, lng: 105.7875231 }; // Tọa độ 96A Đ. Trần Phú, Hà Đông
      
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 16,
        mapTypeControl: false,
        streetViewControl: false,
      });
      
      // Make sure that marker creation works across Google Maps versions
      try {
        // First try with standard marker which always works
        const marker = new window.google.maps.Marker({
          position: location,
          map,
          title: "Sân Bóng Xanh",
        });
        
        // Thêm InfoWindow để hiển thị thông tin
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin-bottom: 5px; font-weight: bold;">Sân Bóng Xanh</h3>
              <p style="margin: 0;">96A Đ. Trần Phú, P. Mộ Lao, Hà Đông, Hà Nội</p>
              <p style="margin: 0; margin-top: 5px;"><strong>SĐT:</strong> 0123 456 789</p>
            </div>
          `
        });
        
        // Automatically open the info window and position it
        infoWindow.open(map, marker);
        
        // Add click listener to marker to open info window
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
        
        console.log("Map initialized successfully");
      } catch (markerError) {
        console.error("Error creating marker:", markerError);
        // If standard marker fails, show error
        setMapError(true);
        toast({
          title: "Lỗi hiển thị bản đồ",
          description: "Không thể tạo điểm đánh dấu trên bản đồ.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(true);
      toast({
        title: "Không thể hiển thị bản đồ",
        description: "Có lỗi xảy ra khi tải Google Maps.",
        variant: "destructive"
      });
    }
  };
  
  const facilities = [
    {
      title: "Sân cỏ nhân tạo chất lượng cao",
      description: "Sân cỏ nhập khẩu, đảm bảo an toàn khi thi đấu",
      icon: "🏟️",
    },
    {
      title: "Hệ thống chiếu sáng hiện đại",
      description: "Đèn LED cao cấp, đảm bảo ánh sáng tối ưu cho các trận đấu buổi tối",
      icon: "💡",
    },
    {
      title: "Phòng thay đồ tiện nghi",
      description: "Phòng thay đồ rộng rãi, sạch sẽ với tủ có khóa an toàn",
      icon: "🚿",
    },
    {
      title: "Dịch vụ ăn uống",
      description: "Đồ ăn nhẹ, nước uống phục vụ trước và sau trận đấu",
      icon: "🥤",
    },
  ];
  
  const fields = [
    { id: 1, name: "Sân A", size: "5 người", img: "https://placehold.co/600x400/E8F5E9/388E3C?text=S%C3%82N+A&font=roboto" },
    { id: 2, name: "Sân B", size: "5 người", img: "https://placehold.co/600x400/E8F5E9/388E3C?text=S%C3%82N+B&font=roboto" },
    { id: 3, name: "Sân C", size: "7 người", img: "https://placehold.co/600x400/E8F5E9/388E3C?text=S%C3%82N+C&font=roboto" },
    { id: 4, name: "Sân D", size: "7 người", img: "https://placehold.co/600x400/E8F5E9/388E3C?text=S%C3%82N+D&font=roboto" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 px-4 md:px-0 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-field-900">
            Sân Bóng Đá Chất Lượng Cao
          </h1>
          <p className="text-xl mb-8 text-gray-700">
            Đặt sân nhanh chóng, tiện lợi cùng nhiều dịch vụ đi kèm
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dat-san">
              <Button className="bg-field-600 hover:bg-field-700 text-white px-6 py-6 text-lg">
                <Calendar className="w-5 h-5 mr-2" /> Đặt sân ngay
              </Button>
            </Link>
            <Link to="/giao-luu">
              <Button variant="outline" className="border-field-500 text-field-700 hover:bg-field-50 px-6 py-6 text-lg">
                <Users className="w-5 h-5 mr-2" /> Tìm đối thủ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fields Display */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-field-800">Hệ Thống Sân Bóng</h2>
          <p className="text-gray-600 mt-2">
            Chúng tôi cung cấp 4 sân cỏ nhân tạo chất lượng cao
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fields.map((field) => (
            <Card key={field.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={field.img}
                alt={field.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-xl mb-1">{field.name}</h3>
                <p className="text-gray-600">Sân {field.size}</p>
                <Link to="/dat-san">
                  <Button variant="outline" className="mt-4 w-full border-field-500 text-field-700 hover:bg-field-50">
                    Đặt sân này
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="py-12 bg-field-50 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-field-800">Tiện Nghi & Dịch Vụ</h2>
          <p className="text-gray-600 mt-2">
            Chúng tôi cung cấp các tiện ích hiện đại cho người chơi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{facility.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About and Contact */}
      <section className="py-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-field-800 mb-6">
            Về Sân Bóng Xanh
          </h2>
          <p className="mb-4 text-gray-700">
            Sân Bóng Xanh là một trong những địa điểm chơi bóng đá chất lượng hàng đầu tại thành phố. Chúng tôi cung cấp sân cỏ nhân tạo chuẩn FIFA, với hệ thống chiếu sáng hiện đại và các tiện nghi đi kèm.
          </p>
          <p className="mb-6 text-gray-700">
            Được thành lập từ năm 2018, chúng tôi luôn cam kết mang đến không gian thi đấu tốt nhất, dịch vụ tuyệt vời với giá cả phải chăng cho người chơi bóng đá mọi lứa tuổi.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-field-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">SB</span>
            </div>
            <div>
              <h3 className="font-bold text-xl">Sân Bóng Xanh</h3>
              <p className="text-gray-600">Nơi đam mê hội tụ</p>
            </div>
          </div>
          
          {/* Google Map */}
          <div className="mt-8 h-80 border border-gray-300 rounded-lg overflow-hidden">
            {mapError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                <MapPin className="h-12 w-12 text-field-500 mb-2" />
                <p className="text-gray-700 font-medium">Không thể tải bản đồ</p>
                <p className="text-gray-500 text-sm text-center px-4">
                  Địa chỉ: 96A Đ. Trần Phú, P. Mộ Lao, Hà Đông, Hà Nội
                </p>
              </div>
            ) : (
              <div ref={mapRef} className="w-full h-full"></div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-field-800 mb-6">
            Liên Hệ & Đặt Sân
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-field-600 mt-1 mr-3" />
              <div>
                <h3 className="font-semibold">Địa chỉ</h3>
                <p className="text-gray-700">
                  96A Đ. Trần Phú, P. Mộ Lao, Hà Đông, Hà Nội
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-5 h-5 text-field-600 mt-1 mr-3" />
              <div>
                <h3 className="font-semibold">Điện thoại</h3>
                <p className="text-gray-700">0123 456 789</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-5 h-5 text-field-600 mt-1 mr-3" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-700">info@sanbongxanh.vn</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Gửi phản hồi</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Họ tên"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-field-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-field-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Nội dung"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-field-500"
                ></textarea>
              </div>
              <Button className="bg-field-600 hover:bg-field-700 text-white w-full">
                Gửi phản hồi
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
