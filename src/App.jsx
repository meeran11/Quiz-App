import React, { useState } from 'react';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  // Sample quiz questions - you can replace these with your own
  const questions = [
    {
      question: "What is the capital of Pakistan?",
      options: ["Karachi", "Islamabad", "Lahore", "Peshawar"],
      correctAnswer: 1
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswer: 1
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Fe", "Cu"],
      correctAnswer: 1
    }
  ];

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const getOptionClass = (optionIndex) => {
    if (!answered) {
      return "bg-white hover:bg-gray-100 border-2 border-gray-300";
    }
    
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      return "bg-green-500 text-white border-2 border-green-600";
    }
    
    if (optionIndex === selectedAnswer && optionIndex !== questions[currentQuestion].correctAnswer) {
      return "bg-red-500 text-white border-2 border-red-600";
    }
    
    return "bg-gray-200 text-gray-500 border-2 border-gray-400";
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Quiz App</h1>
          <p className="text-gray-600 mb-8">
            Test your knowledge with our interactive quiz! Answer 5 questions and see how well you do.
          </p>
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let colorClass = "";
    
    if (percentage >= 80) {
      message = "Excellent! You're a quiz master!";
      colorClass = "text-green-600";
    } else if (percentage >= 60) {
      message = "Good job! You know your stuff!";
      colorClass = "text-blue-600";
    } else if (percentage >= 40) {
      message = "Not bad! Keep learning!";
      colorClass = "text-yellow-600";
    } else {
      message = "Keep studying! You'll get better!";
      colorClass = "text-red-600";
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Quiz Complete!</h1>
          <div className="mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">{score}/{questions.length}</div>
            <div className="text-2xl font-semibold text-gray-600 mb-4">{percentage}%</div>
            <p className={`text-xl font-medium ${colorClass}`}>{message}</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Take Quiz Again
            </button>
            <button
              onClick={() => setShowResults(false)}
              className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transform hover:scale-105 transition-all duration-200"
            >
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-lg font-semibold text-blue-600">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            {questions[currentQuestion].question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${getOptionClass(index)}`}
              >
                <span className="inline-block w-8 h-8 bg-gray-200 text-gray-700 rounded-full text-center leading-8 mr-3 font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={resetQuiz}
              className="bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transform hover:scale-105 transition-all duration-200"
            >
              Restart
            </button>
            
            {answered && (
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
              </button>
            )}
          </div>

          {/* Feedback */}
          {answered && (
            <div className="mt-6 p-4 rounded-xl text-center">
              {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                <div className="text-green-600 font-semibold text-lg">
                  ✓ Correct! Well done!
                </div>
              ) : (
                <div className="text-red-600 font-semibold text-lg">
                  ✗ Incorrect. The correct answer was: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
