'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OptionCard from './OptionCard';
import { RadioGroup } from "@/components/ui/radio-group";

interface QuestionCardProps {
  question: string;
  options: string[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelect = (option: string) => {
    setSelectedOption(option);
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
          <Button variant="outline">Previous</Button>
          <Button>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
