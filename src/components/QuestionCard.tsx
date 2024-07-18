import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OptionCard from './OptionCard';
import { RadioGroup } from "@/components/ui/radio-group";

interface QuestionCardProps {
  question: string;
  options: string[];
  currentIndex: number;  // Current question index
  totalQuestions: number;  // Total number of questions
  onNext: () => void;  // Function to handle next question
  onPrevious: () => void;  // Function to handle previous question
  onAnswer: () => void;  // Function to track answered questions
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, currentIndex, totalQuestions, onNext, onPrevious, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onAnswer(); // Mark the question as answered when an option is selected
  };

  const handleDeselect = () => {
    setSelectedOption('');
  };

  return (
    <Card className="mb-4 p-4">
      <CardHeader className="text-2xl font-bold">{question}</CardHeader>
      <CardContent>
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          {options.map((option, index) => (
            <OptionCard
              key={index}
              option={option}
              selectedOption={selectedOption}
              onSelect={handleSelect}
              onDeselect={handleDeselect}
            />
          ))}
        </RadioGroup>
        <div className="flex justify-between mt-4">
          {currentIndex > 0 && (
            <Button variant="outline" onClick={onPrevious}>Previous</Button>
          )}
          {currentIndex < totalQuestions - 1 && (
            <Button onClick={onNext}>Next</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
