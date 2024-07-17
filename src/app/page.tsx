import React from 'react';
import QuestionCard from '@/components/QuestionCard';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from "@/components/ui/card";

const App = () => {
  const question = "What is the capital of France?";
  const options = ["Paris", "Berlin", "Madrid", "Rome"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="w-2/3">
        <Card className="bg-white p-6 flex flex-col h-screen">
          <CardContent className="flex-grow">
            <h1 className="text-3xl font-bold mb-4 text-center">Quiz App</h1>
            <div className="flex">
              <div className="flex-grow p-4">
                <QuestionCard question={question} options={options} />
              </div>
              <Sidebar />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
