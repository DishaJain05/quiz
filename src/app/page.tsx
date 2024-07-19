'use client';

import React, { useEffect, useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import Sidebar from '@/components/Sidebar';
import { Card } from "@/components/ui/card";

interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
}

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [attempted, setAttempted] = useState<boolean[]>([]);

  useEffect(() => {
    fetch('/api/questions')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched questions:', data);
        setQuestions(data);
        setSelectedOptions(new Array(data.length).fill(''));
        setAttempted(new Array(data.length).fill(false));
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleNextQuestion = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleFinish = () => {
    const score = questions.reduce((acc, question, index) => {
      console.log(`Question ${index + 1}: Correct option - ${question.correctOption}, Selected option - ${selectedOptions[index]}`);
      if (question.correctOption === selectedOptions[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);
    console.log('Final score:', score);
    setScore(score);
  };

  const handleSelectOption = (option: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentIndex] = option;
    console.log('Selected options:', newSelectedOptions);
    setSelectedOptions(newSelectedOptions);
    const newAttempted = [...attempted];
    newAttempted[currentIndex] = true;
    setAttempted(newAttempted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="w-2/3 flex flex-col items-center">
        <Card className="w-full mb-4 p-4 text-center">
          <h1 className="text-3xl font-bold text-red-500">Quiz App</h1>
        </Card>
        <div className="flex w-full h-[calc(100vh-8rem)]">
          {score === null ? (
            <>
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
                    onFinish={handleFinish}
                    onSelectOption={handleSelectOption}
                    selectedOption={selectedOptions[currentIndex]}
                  />
                ) : (
                  <p>Loading questions...</p>
                )}
              </div>
              <Sidebar
                questions={questions}
                currentIndex={currentIndex}
                onChangeIndex={setCurrentIndex}
                attempted={attempted}
                selectedOptions={selectedOptions}
                onFinish={handleFinish} // Pass the onFinish prop
              />
            </>
          ) : (
            <Card className="w-full mb-4 p-4 text-center">
              <h2 className="text-2xl font-bold">Your Score</h2>
              <p className="text-xl">{score} / {questions.length}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
