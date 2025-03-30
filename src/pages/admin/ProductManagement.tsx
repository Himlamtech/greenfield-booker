
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inventory: number;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Áo bóng đá Nike",
    price: 350000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=%C3%81o+b%C3%B3ng+%C4%91%C3%A1&font=roboto",
    category: "clothes",
    description: "Áo bóng đá chất liệu thun lạnh, thoáng mát, thấm hút mồ hôi tốt",
    inventory: 25
  },
  {
    id: 2,
    name: "Giày đá bóng Adidas",
    price: 1200000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=Gi%C3%A0y+b%C3%B3ng+%C4%91%C3%A1&font=roboto",
    category: "shoes",
    description: "Giày đá bóng sân cỏ nhân tạo, đế TF bám sân tốt",
    inventory: 12
  },
  {
    id: 3,
    name: "Bóng đá size 5",
    price: 450000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=B%C3%B3ng+%C4%91%C3%A1&font=roboto",
    category: "equipment",
    description: "Bóng đá chất lượng cao, phù hợp cho mọi mặt sân",
    inventory: 30
  },
  {
    id: 4,
    name: "Áo thủ môn",
    price: 280000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=%C3%81o+th%E1%BB%A7+m%C3%B4n&font=roboto",
    category: "clothes",
    description: "Áo thủ môn chuyên dụng, có đệm bảo vệ",
    inventory: 8
  },
  {
    id: 5,
    name: "Giày đá bóng Nike",
    price: 1500000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=Gi%C3%A0y+Nike&font=roboto",
    category: "shoes",
    description: "Giày đá bóng cao cấp, nhẹ và bám sân tốt",
    inventory: 5
  },
  {
    id: 6,
    name: "Găng tay thủ môn",
    price: 320000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=G%C4%83ng+tay&font=roboto",
    category: "equipment",
    description: "Găng tay thủ môn có lớp đệm đặc biệt, bảo vệ tay tốt",
    inventory: 15
  },
  {
    id: 7,
    name: "Nước uống thể thao",
    price: 25000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=N%C6%B0%E1%BB%9Bc+u%E1%BB%91ng&font=roboto",
    category: "food",
    description: "Nước uống thể thao bổ sung điện giải, giúp phục hồi nhanh",
    inventory: 50
  },
  {
    id: 8,
    name: "Bánh năng lượng",
    price: 35000,
    image: "https://placehold.co/300x300/E8F5E9/388E3C?text=B%C3%A1nh+n%C4%83ng+l%C6%B0%E1%BB%A3ng&font=roboto",
    category: "food",
    description: "Bánh năng lượng giúp bổ sung nhanh năng lượng khi chơi thể thao",
    inventory: 40
  },
];

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState("all");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form state
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("clothes");
  const [productDescription, setProductDescription] = useState("");
  const [productInventory, setProductInventory] = useState("");
  
  const { toast } = useToast();
  
  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(product => product.category === activeTab);
  
  const handleAddProduct = () => {
    const newProduct: Product = {
      id: products.length + 1,
      name: productName,
      price: parseInt(productPrice) || 0,
      image: productImage || "https://placehold.co/300x300/E8F5E9/388E3C?text=S%E1%BA%A3n+ph%E1%BA%A9m+m%E1%BB%9Bi&font=roboto",
      category: productCategory,
      description: productDescription,
      inventory: parseInt(productInventory) || 0,
    };
    
    setProducts([...products, newProduct]);
    resetForm();
    setIsAddingProduct(false);
    
    toast({
      title: "Thêm sản phẩm thành công",
      description: `Sản phẩm "${productName}" đã được thêm vào.`,
    });
  };
  
  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id
        ? {
            ...p,
            name: productName || p.name,
            price: parseInt(productPrice) || p.price,
            image: productImage || p.image,
            category: productCategory || p.category,
            description: productDescription || p.description,
            inventory: parseInt(productInventory) || p.inventory,
          }
        : p
    );
    
    setProducts(updatedProducts);
    resetForm();
    setEditingProduct(null);
    
    toast({
      title: "Cập nhật sản phẩm thành công",
      description: `Sản phẩm "${productName}" đã được cập nhật.`,
    });
  };
  
  const handleDeleteProduct = (id: number) => {
    const productToDelete = products.find(p => p.id === id);
    if (!productToDelete) return;
    
    setProducts(products.filter(p => p.id !== id));
    
    toast({
      title: "Xóa sản phẩm thành công",
      description: `Sản phẩm "${productToDelete.name}" đã bị xóa.`,
    });
  };
  
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductPrice(product.price.toString());
    setProductImage(product.image);
    setProductCategory(product.category);
    setProductDescription(product.description);
    setProductInventory(product.inventory.toString());
  };
  
  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductImage("");
    setProductCategory("clothes");
    setProductDescription("");
    setProductInventory("");
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý sản phẩm</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="clothes">Quần áo</TabsTrigger>
            <TabsTrigger value="shoes">Giày</TabsTrigger>
            <TabsTrigger value="equipment">Thiết bị</TabsTrigger>
            <TabsTrigger value="food">Đồ ăn & nước</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogTrigger asChild>
            <Button className="bg-field-600 hover:bg-field-700">
              Thêm sản phẩm mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin chi tiết cho sản phẩm mới
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Tên sản phẩm</label>
                <Input
                  placeholder="Nhập tên sản phẩm"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Giá (VNĐ)</label>
                  <Input
                    type="number"
                    placeholder="Nhập giá sản phẩm"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tồn kho</label>
                  <Input
                    type="number"
                    placeholder="Số lượng tồn kho"
                    value={productInventory}
                    onChange={(e) => setProductInventory(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Danh mục</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-field-500"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option value="clothes">Quần áo</option>
                  <option value="shoes">Giày</option>
                  <option value="equipment">Thiết bị</option>
                  <option value="food">Đồ ăn & nước</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Link hình ảnh</label>
                <Input
                  placeholder="Nhập link hình ảnh"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Mô tả</label>
                <Textarea
                  placeholder="Mô tả sản phẩm"
                  rows={3}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  resetForm();
                  setIsAddingProduct(false);
                }}
              >
                Hủy
              </Button>
              <Button 
                className="bg-field-600 hover:bg-field-700" 
                onClick={handleAddProduct}
                disabled={!productName || !productPrice}
              >
                Thêm sản phẩm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
              <DialogDescription>
                Chỉnh sửa thông tin chi tiết cho sản phẩm
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Tên sản phẩm</label>
                <Input
                  placeholder="Nhập tên sản phẩm"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Giá (VNĐ)</label>
                  <Input
                    type="number"
                    placeholder="Nhập giá sản phẩm"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tồn kho</label>
                  <Input
                    type="number"
                    placeholder="Số lượng tồn kho"
                    value={productInventory}
                    onChange={(e) => setProductInventory(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Danh mục</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-field-500"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option value="clothes">Quần áo</option>
                  <option value="shoes">Giày</option>
                  <option value="equipment">Thiết bị</option>
                  <option value="food">Đồ ăn & nước</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Link hình ảnh</label>
                <Input
                  placeholder="Nhập link hình ảnh"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Mô tả</label>
                <Textarea
                  placeholder="Mô tả sản phẩm"
                  rows={3}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  resetForm();
                  setEditingProduct(null);
                }}
              >
                Hủy
              </Button>
              <Button 
                className="bg-field-600 hover:bg-field-700" 
                onClick={handleUpdateProduct}
              >
                Cập nhật
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Product Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4">Sản phẩm</th>
                  <th className="text-left p-4">Danh mục</th>
                  <th className="text-left p-4">Giá</th>
                  <th className="text-left p-4">Tồn kho</th>
                  <th className="text-right p-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b last:border-b-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={`
                        ${product.category === "clothes" ? "bg-blue-100 text-blue-800" : ""}
                        ${product.category === "shoes" ? "bg-purple-100 text-purple-800" : ""}
                        ${product.category === "equipment" ? "bg-green-100 text-green-800" : ""}
                        ${product.category === "food" ? "bg-yellow-100 text-yellow-800" : ""}
                      `}>
                        {product.category === "clothes" && "Quần áo"}
                        {product.category === "shoes" && "Giày"}
                        {product.category === "equipment" && "Thiết bị"}
                        {product.category === "food" && "Đồ ăn & nước"}
                      </Badge>
                    </td>
                    <td className="p-4">{product.price.toLocaleString()}đ</td>
                    <td className="p-4">
                      <Badge className={`
                        ${product.inventory > 10 ? "bg-green-100 text-green-800" : 
                         product.inventory > 0 ? "bg-yellow-100 text-yellow-800" : 
                         "bg-red-100 text-red-800"}
                      `}>
                        {product.inventory}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditClick(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Không có sản phẩm nào trong danh mục này
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
