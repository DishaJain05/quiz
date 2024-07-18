import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SidebarProps {
  questions: { question: string, option1: string, option2: string, option3: string, option4: string }[];
  currentIndex: number;
}

const Sidebar: React.FC<SidebarProps> = ({ questions, currentIndex }) => (
  <Card className="w-1/3 h-full p-4 flex flex-col items-center">
    <CardContent className="flex flex-wrap items-center mb-4">
      {questions.map((_, index) => (
        <div
          key={index}
          className={`w-8 h-8 rounded-full flex items-center justify-center m-1 ${index === currentIndex ? 'bg-black text-white' : 'bg-gray-300'}`}
        >
          {index + 1}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default Sidebar;
