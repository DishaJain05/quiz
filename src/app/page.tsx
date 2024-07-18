'use client';

import React, { useEffect, useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import Sidebar from '@/components/Sidebar';
import { Card } from "@/components/ui/card";

// Define interface for question object
interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/questions')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched questions:', data); // Log the fetched data
        setQuestions(data); // Assuming data is an array of objects with the structure defined by Question interface
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleNextQuestion = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="w-2/3 flex flex-col items-center">
        <Card className="w-full mb-4 p-4 text-center">
          <h1 className="text-3xl font-bold">Quiz App</h1>
        </Card>
        <div className="flex w-full h-[calc(100vh-8rem)]"> {/* Adjusted height to fill the available space */}
          <div className="flex-1 flex flex-col bg-white p-4 rounded-md shadow-lg h-full">
            {questions.length > 0 ? (
              <QuestionCard
                question={questions[currentIndex].question}
                options={[
                  questions[currentIndex].option1,
                  questions[currentIndex].option2,
                  questions[currentIndex].option3,
                  questions[currentIndex].option4
                ]}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                onNext={handleNextQuestion}
                onPrevious={handlePreviousQuestion}
              />
            ) : (
              <p>Loading questions...</p>
            )}
          </div>
          <Sidebar questions={questions} currentIndex={currentIndex}/>
        </div>
      </div>
    </div>
  );
};

export default App;
