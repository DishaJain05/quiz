'use client';
import React, { useEffect, useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import Sidebar from '@/components/Sidebar';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  topicid: number;
}

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [attempted, setAttempted] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(600); // Default to 10 minutes
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [topicid, setTopicid] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-side only
      const storedTimeLeft = localStorage.getItem('timeLeft');
      const storedHasStarted = localStorage.getItem('hasStarted');
      if (storedTimeLeft) setTimeLeft(parseInt(storedTimeLeft, 10));
      if (storedHasStarted === 'true') setHasStarted(true);
    }
  }, []);

  useEffect(() => {
    fetch(`/api/questions?topicid=${topicid}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setAttempted(new Array(data.length).fill(false));
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, [topicid]);

  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          const newTimeLeft = prevTimeLeft - 1;
          if (typeof window !== 'undefined') {
            localStorage.setItem('timeLeft', newTimeLeft.toString());
          }
          if (newTimeLeft <= 0) {
            clearInterval(timer);
            handleFinish();
          }
          return newTimeLeft;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasStarted]);

  const handleNextQuestion = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleFinish = () => {
    const score = questions.reduce((acc, question, index) => {
      if (question.correctOption === selectedOptions[question.id]) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(score);

    // Submit the performance data
    const performanceData = {
      studentid: 1, 
      studentname: 'John Doe', 
      courseid: 1, 
      moduleid: 1,
      topicid: topicid, 
      score: score
    };

    fetch('/api/submitScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(performanceData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Performance data saved:', data);
      })
      .catch(error => {
        console.error('Error saving performance data:', error);
      });

    // Reset the local storage and state
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hasStarted');
      localStorage.removeItem('timeLeft');
    }
    setHasStarted(false);
  };

  const handleSelectOption = (option: string) => {
    const questionId = questions[currentIndex].id;
    const selectedOption = option.split(',')[0]; // Extract part before the comma
    const newSelectedOptions = { ...selectedOptions, [questionId]: selectedOption };
    setSelectedOptions(newSelectedOptions);
    const newAttempted = [...attempted];
    newAttempted[currentIndex] = true;
    setAttempted(newAttempted);
  };

  const handleStartQuiz = () => {
    setHasStarted(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasStarted', 'true');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 relative">
      <div className="w-2/3 flex flex-col items-center">
        <Card className="w-full mb-4 p-4 text-center relative">
          <h1 className="text-3xl font-bold text-red-500">Quiz App</h1>
          {hasStarted && (
            <div className="text-xl absolute top-4 right-4">
              {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </div>
          )}
        </Card>
        <div className="flex w-full h-[calc(100vh-8rem)]">
          {score === null ? (
            <>
              <div className="flex-1 flex flex-col bg-white p-4 rounded-md shadow-lg h-full">
                {hasStarted ? (
                  questions.length > 0 ? (
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
                      selectedOption={selectedOptions[questions[currentIndex].id] || ''}
                    />
                  ) : (
                    <p>Loading questions...</p>
                  )
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-xl">Click "Start Quiz" to begin.</p>
                  </div>
                )}
              </div>
              <Sidebar
                questions={questions}
                currentIndex={currentIndex}
                onChangeIndex={setCurrentIndex}
                attempted={attempted}
                selectedOptions={selectedOptions}
                onFinish={handleFinish}
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
      {!hasStarted && (
        <Button 
          onClick={handleStartQuiz} 
          className="absolute top-4 right-4"
        >
          Start Quiz
        </Button>
      )}
    </div>
  );
};

export default App;
