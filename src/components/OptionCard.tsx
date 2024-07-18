'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface OptionCardProps {
  option: string;
  selectedOption: string;
  onSelect: (option: string) => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, selectedOption, onSelect }) => {
  const isSelected = selectedOption === option;

  const handleSelect = () => {
    onSelect(option);
  };

  return (
    <Card className={`cursor-pointer mb-2 ${isSelected ? 'bg-gray-200' : ''}`} onClick={handleSelect}>
      <CardContent className="flex items-center">
        <RadioGroupItem value={option} checked={isSelected} onChange={() => {}} className="mr-2" />
        {option}
      </CardContent>
    </Card>
  );
};

export default OptionCard;
