
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Áo bóng đá Nike",
    price: 350000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=%C3%81o+b%C3%B3ng+%C4%91%C3%A1&font=roboto",
    category: "clothes",
    description: "Áo bóng đá chất liệu thun lạnh, thoáng mát, thấm hút mồ hôi tốt"
  },
  {
    id: 2,
    name: "Giày đá bóng Adidas",
    price: 1200000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=Gi%C3%A0y+b%C3%B3ng+%C4%91%C3%A1&font=roboto",
    category: "shoes",
    description: "Giày đá bóng sân cỏ nhân tạo, đế TF bám sân tốt"
  },
  {
    id: 3,
    name: "Bóng đá size 5",
    price: 450000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=B%C3%B3ng+%C4%91%C3%A1&font=roboto",
    category: "equipment",
    description: "Bóng đá chất lượng cao, phù hợp cho mọi mặt sân"
  },
  {
    id: 4,
    name: "Áo thủ môn",
    price: 280000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=%C3%81o+th%E1%BB%A7+m%C3%B4n&font=roboto",
    category: "clothes",
    description: "Áo thủ môn chuyên dụng, có đệm bảo vệ"
  },
  {
    id: 5,
    name: "Giày đá bóng Nike",
    price: 1500000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=Gi%C3%A0y+Nike&font=roboto",
    category: "shoes",
    description: "Giày đá bóng cao cấp, nhẹ và bám sân tốt"
  },
  {
    id: 6,
    name: "Găng tay thủ môn",
    price: 320000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=G%C4%83ng+tay&font=roboto",
    category: "equipment",
    description: "Găng tay thủ môn có lớp đệm đặc biệt, bảo vệ tay tốt"
  },
  {
    id: 7,
    name: "Nước uống thể thao",
    price: 25000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=N%C6%B0%E1%BB%9Bc+u%E1%BB%91ng&font=roboto",
    category: "food",
    description: "Nước uống thể thao bổ sung điện giải, giúp phục hồi nhanh"
  },
  {
    id: 8,
    name: "Bánh năng lượng",
    price: 35000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=B%C3%A1nh+n%C4%83ng+l%C6%B0%E1%BB%A3ng&font=roboto",
    category: "food",
    description: "Bánh năng lượng giúp bổ sung nhanh năng lượng khi chơi thể thao"
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();
  
  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(product => product.category === activeTab);
  
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: product.name,
    });
  };
  
  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };
  
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const handleCheckout = () => {
    toast({
      title: "Đặt hàng thành công!",
      description: `Cảm ơn bạn đã đặt hàng. Tổng thanh toán: ${totalPrice.toLocaleString()}đ`,
    });
    setCartItems([]);
    setShowCart(false);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-center">Dịch Vụ & Sản Phẩm</h1>
      <p className="text-center text-gray-600 mb-8">Các sản phẩm và dịch vụ đi kèm tại Sân Bóng Xanh</p>
      
      {/* Cart Button */}
      <div className="flex justify-end mb-6">
        <Button 
          variant="outline" 
          className="relative border-field-500 text-field-700"
          onClick={() => setShowCart(!showCart)}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          <span>Giỏ hàng</span>
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-field-600">
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
      
      {/* Cart Display */}
      {showCart && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Giỏ hàng</h2>
              <Button 
                variant="ghost" 
                className="text-gray-500 h-8"
                onClick={() => setShowCart(false)}
              >
                Đóng
              </Button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Giỏ hàng trống</p>
                <Button 
                  variant="link" 
                  className="text-field-600 mt-2"
                  onClick={() => setShowCart(false)}
                >
                  Tiếp tục mua sắm
                </Button>
              </div>
            ) : (
              <div>
                <div className="space-y-4 max-h-80 overflow-auto">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center border-b border-gray-100 pb-4">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">{item.product.price.toLocaleString()}đ</p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="ml-4 h-8 text-gray-500"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold">Tổng thanh toán:</span>
                    <span className="font-semibold">{totalPrice.toLocaleString()}đ</span>
                  </div>
                  <Button 
                    className="w-full bg-field-600 hover:bg-field-700 text-white"
                    onClick={handleCheckout}
                  >
                    Tiến hành thanh toán
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Product Categories */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="clothes">Quần áo</TabsTrigger>
          <TabsTrigger value="shoes">Giày</TabsTrigger>
          <TabsTrigger value="equipment">Thiết bị</TabsTrigger>
          <TabsTrigger value="food">Đồ ăn & nước</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <Badge className="bg-field-600">{product.price.toLocaleString()}đ</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <Button 
                    className="w-full bg-field-600 hover:bg-field-700 text-white"
                    onClick={() => addToCart(product)}
                  >
                    Thêm vào giỏ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p>Không có sản phẩm nào trong danh mục này.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Services Info */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Các Dịch Vụ Khác</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-field-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🥅</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Cho thuê dụng cụ</h3>
              <p className="text-gray-600 text-sm">
                Cho thuê bóng, giày, áo bib và các dụng cụ tập luyện khác với giá cả phải chăng
              </p>
              <Button variant="link" className="text-field-600 mt-2">
                Chi tiết
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-field-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🏫</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Huấn luyện viên</h3>
              <p className="text-gray-600 text-sm">
                Đội ngũ HLV chuyên nghiệp, giàu kinh nghiệm sẵn sàng huấn luyện cho đội bóng của bạn
              </p>
              <Button variant="link" className="text-field-600 mt-2">
                Chi tiết
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-field-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tổ chức giải đấu</h3>
              <p className="text-gray-600 text-sm">
                Dịch vụ tổ chức giải đấu chuyên nghiệp với đầy đủ hệ thống bảng đấu, trọng tài
              </p>
              <Button variant="link" className="text-field-600 mt-2">
                Chi tiết
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
