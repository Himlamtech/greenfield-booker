import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

const FieldManagement = () => {
  const [fields, setFields] = useState([
    { id: 1, name: "Sân A", isLocked: false },
    { id: 2, name: "Sân B", isLocked: true },
    { id: 3, name: "Sân C", isLocked: false },
    { id: 4, name: "Sân D", isLocked: true },
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Field pricing management - Make it slightly larger */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Quản lý giá sân</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              {/* Pricing management content goes here */}
              <p>Chức năng quản lý giá sân sẽ được cập nhật sớm nhất.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Field booking management */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Quản lý sân</CardTitle>
          </CardHeader>
          <CardContent>
            {fields.map((field) => (
              <div key={field.id} className="flex items-center justify-between mb-4 p-3 border rounded">
                <span>{field.name}</span>
                <Button 
                  variant="ghost" 
                  className={field.isLocked ? "text-red-500" : "text-gray-700"}
                >
                  {field.isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FieldManagement;
