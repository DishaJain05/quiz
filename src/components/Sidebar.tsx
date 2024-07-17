import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Sidebar = () => (
  <Card className="w-1/4 h-screen p-4 flex flex-col items-center">
    <CardContent className="flex flex-wrap items-center mb-4">
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full flex items-center justify-center m-1 ${i === 0 ? 'bg-black text-white' : 'bg-gray-300'}`}
        >
          {i + 1}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default Sidebar;
