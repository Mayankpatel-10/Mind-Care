import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StandardAssessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const assessments = [
    {
      id: 1,
      title: "PHQ-9 Depression Assessment",
      description: "Measures depression severity",
      duration: "5-7 minutes",
      questions: [
        "Little interest or pleasure in doing things",
        "Feeling down, depressed, or hopeless",
        "Trouble falling or staying asleep, or sleeping too much",
        "Feeling tired or having little energy",
        "Poor appetite or overeating",
        "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
        "Trouble concentrating on things, such as reading the newspaper or watching television",
        "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
        "Thoughts that you would be better off dead or of hurting yourself in some way"
      ]
    },
    {
      id: 2,
      title: "GAD-7 Anxiety Assessment",
      description: "Measures anxiety severity",
      duration: "3-5 minutes",
      questions: [
        "Feeling nervous, anxious, or on edge",
        "Not being able to stop or control worrying",
        "Worrying too much about different things",
        "Trouble relaxing",
        "Being so restless that it is hard to sit still",
        "Becoming easily annoyed or irritable",
        "Feeling afraid as if something awful might happen"
      ]
    }
  ];

  const handleStartAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (score) => {
    const newAnswers = {
      ...answers,
      [currentQuestion]: score
    };
    
    setAnswers(newAnswers);
    
    if (currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const getResultMessage = (score, assessmentId) => {
    if (assessmentId === 1) { // PHQ-9
      if (score <= 4) return { message: "Minimal depression", severity: "low" };
      if (score <= 9) return { message: "Mild depression", severity: "mild" };
      if (score <= 14) return { message: "Moderate depression", severity: "moderate" };
      if (score <= 19) return { message: "Moderately severe depression", severity: "moderately-severe" };
      return { message: "Severe depression", severity: "severe" };
    } else { // GAD-7
      if (score <= 4) return { message: "Minimal anxiety", severity: "low" };
      if (score <= 9) return { message: "Mild anxiety", severity: "mild" };
      if (score <= 14) return { message: "Moderate anxiety", severity: "moderate" };
      return { message: "Severe anxiety", severity: "severe" };
    }
  };

  if (showResults) {
    const score = calculateScore();
    const result = getResultMessage(score, selectedAssessment.id);
    
    const severityColors = {
      low: "bg-green-50 border-green-200 text-green-800",
      mild: "bg-blue-50 border-blue-200 text-blue-800",
      moderate: "bg-yellow-50 border-yellow-200 text-yellow-800",
      "moderately-severe": "bg-orange-50 border-orange-200 text-orange-800",
      severe: "bg-red-50 border-red-200 text-red-800"
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-mental-dark mb-4">Assessment Results</h2>
          
          <div className={`border rounded-lg p-4 mb-6 ${severityColors[result.severity]}`}>
            <h3 className="text-lg font-semibold mb-2">{selectedAssessment.title}</h3>
            <p className="mb-2">Your score: <span className="font-bold">{score}</span></p>
            <p className="font-semibold">{result.message}</p>
          </div>
          
          <p className="text-gray-600 mb-6">
            <strong>Important:</strong> This assessment is not a diagnostic tool. It is designed to help you 
            understand your mental health better. If you're concerned about your results, please consult with a 
            mental health professional.
          </p>
          
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <button 
              onClick={() => handleStartAssessment(selectedAssessment)}
              className="btn-primary flex-1"
            >
              Retake Assessment
            </button>
            <button 
              onClick={() => setSelectedAssessment(null)}
              className="btn-secondary flex-1"
            >
              Back to Assessments
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-mental-dark mb-2">{selectedAssessment.title}</h2>
          <p className="text-gray-600 mb-6">Question {currentQuestion + 1} of {selectedAssessment.questions.length}</p>
          
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-mental-blue h-2.5 rounded-full" 
                style={{ width: `${((currentQuestion + 1) / selectedAssessment.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-mental-dark mb-4">
            {selectedAssessment.questions[currentQuestion]}
          </h3>
          
          <p className="text-gray-600 mb-4">How often have you been bothered by this over the last 2 weeks?</p>
          
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[0, 1, 2, 3].map((score) => (
              <motion.button
                key={score}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-100 rounded-lg text-center hover:bg-mental-blue hover:text-white transition-colors"
                onClick={() => handleAnswer(score)}
              >
                {score === 0 ? 'Not at all' : 
                 score === 1 ? 'Several days' : 
                 score === 2 ? 'More than half the days' : 
                 'Nearly every day'}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-mental-dark text-center mb-8">Clinical Assessments</h1>
        <p className="text-gray-600 text-center mb-8">
          Standardized mental health assessments can provide insights into your mental well-being.
          These are based on clinically validated tools used by professionals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((assessment) => (
            <motion.div
              key={assessment.id}
              whileHover={{ y: -5 }}
              className="card cursor-pointer"
              onClick={() => handleStartAssessment(assessment)}
            >
              <h3 className="text-xl font-semibold text-mental-dark mb-2">{assessment.title}</h3>
              <p className="text-gray-600 mb-4">{assessment.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>⏱️ {assessment.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-mental-blue mb-2">Important Note</h3>
          <p className="text-sm text-gray-600">
            These assessments are for informational purposes only and are not a substitute for 
            professional diagnosis or treatment. If you're experiencing a mental health crisis, 
            please contact emergency services or a mental health professional immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StandardAssessment;