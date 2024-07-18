import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SidebarProps {
  totalQuestions: number;
  answeredQuestions: Set<number>; // Set to store indices of answered questions
  currentIndex: number; // Current question index
}

const Sidebar: React.FC<SidebarProps> = ({ totalQuestions, answeredQuestions, currentIndex }) => (
  <Card className="w-1/4 h-full p-4 flex flex-col items-center">
    <CardContent className="flex flex-wrap items-center mb-4">
      {Array.from({ length: totalQuestions-1 }, (_, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full flex items-center justify-center m-1 ${
            currentIndex === i ? 'bg-blue-600 text-white' :
            answeredQuestions.has(i) ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          {i + 1}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default Sidebar;
