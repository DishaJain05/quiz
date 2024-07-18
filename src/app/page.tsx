 'use client';
// import React, { useEffect, useState } from 'react';
// import QuestionCard from '@/components/QuestionCard';
// import Sidebar from '@/components/Sidebar';

// // Define interface for question object
// interface Question {
//   question: string;
//   option1: string;
//   option2: string;
//   option3: string;
//   option4: string;
// }

// const App = () => {
//   const [questions, setQuestions] = useState<Question[]>([]); // Specify the type as Question[]

//   useEffect(() => {
//     fetch('/api/questions')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Fetched questions:', data);
//         setQuestions(data); // Assuming data is an array of objects with the structure defined by Question interface
//       })
//       .catch((error) => console.error('Error fetching questions:', error));
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-500">
//       <div className="w-2/3">
//         <div className="bg-white p-6 flex flex-col h-screen">
//           <h1 className="text-3xl font-bold mb-4 text-center">Quiz App</h1>
//           {questions.length > 0 ? (
//             questions.map((question, index) => (
//               <QuestionCard
//                 key={index}
//                 question={question.question}
//                 options={[
//                   question.option1,
//                   question.option2,
//                   question.option3,
//                   question.option4
//                 ]}
//               />
//             ))
//           ) : (
//             <p>Loading questions...</p>
//           )}
//           <Sidebar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


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

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="w-2/3">
        <div className="bg-white p-6 flex flex-col h-screen">
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
            />
          ) : (
            <p>Loading questions...</p>
          )}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default App;

