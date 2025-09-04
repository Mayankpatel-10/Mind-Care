import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuickAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "How are you feeling today?",
      options: [
        "😢 Very sad",
        "😞 Sad", 
        "😐 Neutral",
        "🙂 Good",
        "😄 Great"
      ]
    },
    {
      id: 2,
      question: "How was your sleep last night?",
      options: [
        "😴 Restless",
        "😪 Poor",
        "😐 Okay",
        "😊 Good", 
        "😍 Excellent"
      ]
    },
    {
      id: 3,
      question: "How manageable is your stress today?",
      options: [
        "😫 Overwhelming",
        "😓 High",
        "😌 Manageable",
        "😊 Low",
        "😇 Minimal"
      ]
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { 
      questionId: questions[currentQuestion].id, 
      answer 
    }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      // Send to backend
      console.log('Quick assessment results:', newAnswers);
    }
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    // Calculate average mood (simplified)
    const moodScore = answers.reduce((acc, curr, index) => {
      return acc + (curr.answer.match(/😢|😴|😫/) ? 1 : 
                curr.answer.match(/😞|😪|😓/) ? 2 :
                curr.answer.match(/😐/) ? 3 :
                curr.answer.match(/🙂|😊|😌/) ? 4 : 5);
    }, 0) / answers.length;

    let moodMessage = "";
    if (moodScore <= 2) moodMessage = "It seems you're having a tough day. Consider reaching out for support.";
    else if (moodScore <= 3) moodMessage = "You're managing okay. Remember to practice self-care today.";
    else if (moodScore <= 4) moodMessage = "You're doing well! Keep up the positive mindset.";
    else moodMessage = "You're thriving today! Enjoy this positive energy.";

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white overflow-hidden shadow rounded-lg p-6"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Check-in Results</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
          <p className="text-blue-800">{moodMessage}</p>
        </div>
        <p className="text-gray-600 mb-4">
          Remember to check in again tomorrow to track your mood patterns.
        </p>
        <button
          onClick={restartAssessment}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Check-in Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white overflow-hidden shadow rounded-lg p-6"
    >
      <h2 className="text-lg font-medium text-gray-900 mb-4">Daily Check-in</h2>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>
      
      <h3 className="text-md font-medium text-gray-700 mb-4">
        {questions[currentQuestion].question}
      </h3>
      
      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 bg-gray-50 rounded-md border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 flex items-center"
            onClick={() => handleAnswer(option)}
          >
            <span className="text-xl mr-3">{option.split(' ')[0]}</span>
            <span>{option.split(' ').slice(1).join(' ')}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickAssessment;