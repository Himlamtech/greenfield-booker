
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QRCodePaymentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  description: string;
  onSuccess?: () => void;
}

const QRCodePayment = ({ 
  open, 
  onOpenChange, 
  amount, 
  customerInfo, 
  description, 
  onSuccess 
}: QRCodePaymentProps) => {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Giả lập số tài khoản VietQR
  const bankAccount = "9876543210";
  const bankName = "MB Bank";
  const accountName = "SÂN BÓNG XANH";
  
  // Reset trạng thái khi dialog mở
  useEffect(() => {
    if (open) {
      setPaid(false);
      setLoading(false);
    }
  }, [open]);
  
  // Giả lập quá trình thanh toán, trong thực tế đây sẽ là callback từ VietQR
  const handleCheckPayment = () => {
    setLoading(true);
    // Giả lập thời gian xử lý
    setTimeout(() => {
      setPaid(true);
      setLoading(false);
      // Callback khi thanh toán thành công
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    }, 2000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Quét mã QR để thanh toán</DialogTitle>
          <DialogDescription className="text-center">
            Số tiền: {amount.toLocaleString()}đ
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          {paid ? (
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-700">Thanh toán thành công!</h3>
              <p className="text-gray-500">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
            </div>
          ) : (
            <>
              {/* QR Code placeholder - trong thực tế sẽ được thay thế bằng mã QR thật từ VietQR */}
              <div className="bg-gray-100 w-64 h-64 flex items-center justify-center border">
                {/* Placeholder QR code, thực tế sẽ được thay thế với API VietQR */}
                <img 
                  src="https://placehold.co/300x300/E8F5E9/388E3C?text=VietQR+Code&font=roboto" 
                  alt="QR Code" 
                  className="w-full h-full" 
                />
              </div>
              
              <div className="text-sm text-gray-600 space-y-2 w-full">
                <p><span className="font-semibold">Ngân hàng:</span> {bankName}</p>
                <p><span className="font-semibold">Số tài khoản:</span> {bankAccount}</p>
                <p><span className="font-semibold">Tên tài khoản:</span> {accountName}</p>
                <p><span className="font-semibold">Số tiền:</span> {amount.toLocaleString()}đ</p>
                <p><span className="font-semibold">Nội dung:</span> {description}</p>
              </div>
              
              <Button 
                className="w-full bg-field-600 hover:bg-field-700" 
                onClick={handleCheckPayment}
                disabled={loading}
              >
                {loading ? "Đang kiểm tra thanh toán..." : "Tôi đã thanh toán"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodePayment;
