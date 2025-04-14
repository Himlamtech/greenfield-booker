import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Feedback = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Make feedback response section sticky */}
      <div className="lg:col-span-2">
        <div className="sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Trả lời phản hồi</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <textarea
                  placeholder="Nhập phản hồi"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-field-500"
                ></textarea>
                <button className="bg-field-600 hover:bg-field-700 text-white px-4 py-2 rounded-md mt-3">
                  Gửi phản hồi
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Make feedback statistics sticky */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê phản hồi</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p>Tổng số phản hồi: 100</p>
                <p>Phản hồi đã trả lời: 70</p>
                <p>Phản hồi chưa trả lời: 30</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
