import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moodOptions = [
    { emoji: '😢', label: 'Very Sad', value: 1 },
    { emoji: '😞', label: 'Sad', value: 2 },
    { emoji: '😐', label: 'Neutral', value: 3 },
    { emoji: '🙂', label: 'Good', value: 4 },
    { emoji: '😄', label: 'Great', value: 5 },
  ];

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Mood Level',
        data: [3, 4, 3, 5, 4, 3, 4],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            const moods = ['', 'Very Sad', 'Sad', 'Neutral', 'Good', 'Great'];
            return moods[value];
          }
        }
      }
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    // Here you would typically send this to your backend
    console.log('Selected mood:', mood);
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Mood Tracker</h2>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">How are you feeling today?</h3>
        <div className="flex justify-between">
          {moodOptions.map((mood) => (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center p-2 rounded-lg ${
                selectedMood === mood.value ? 'bg-indigo-100 border border-indigo-300' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleMoodSelect(mood.value)}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs mt-1">{mood.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Your Mood This Week</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MoodTracker;