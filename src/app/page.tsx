'use client';
import React, { useEffect, useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import Sidebar from '@/components/Sidebar';

// Define interface for question object
interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]); // Specify the type as Question[]
  const [currentIndex, setCurrentIndex] = useState(0); // Current question index
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set()); // Track answered questions

  useEffect(() => {
    fetch('/api/questions')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched questions:', data);
        setQuestions(data); // Assuming data is an array of objects with the structure defined by Question interface
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleNextQuestion = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  const handleAnswer = () => {
    setAnsweredQuestions(prevAnsweredQuestions => new Set(prevAnsweredQuestions).add(currentIndex));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="flex w-2/3 bg-white p-6 h-screen">
        <div className="flex-grow flex flex-col">
          <h1 className="text-3xl font-bold mb-4 text-center">Quiz App</h1>
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
              onAnswer={handleAnswer} // Pass the handleAnswer function
            />
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
        <Sidebar totalQuestions={questions.length} answeredQuestions={answeredQuestions} currentIndex={currentIndex} />
      </div>
    </div>
  );
};

export default App;
