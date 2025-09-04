import React from 'react';
import { motion } from 'framer-motion';

const Resources = () => {
  const resources = [
    {
      category: "Crisis Support",
      items: [
        {
          title: "National Suicide Prevention Lifeline",
          description: "24/7 free and confidential support",
          phone: "988",
          url: "https://988lifeline.org"
        },
        {
          title: "Crisis Text Line",
          description: "Text with a trained crisis counselor",
          phone: "Text HOME to 741741",
          url: "https://www.crisistextline.org"
        }
      ]
    },
    {
      category: "Self-Help Resources",
      items: [
        {
          title: "Mindfulness Exercises",
          description: "Guided meditation and breathing exercises",
          url: "https://www.mindful.org/meditation/mindfulness-getting-started/"
        },
        {
          title: "Mental Health America",
          description: "Screening tools and educational resources",
          url: "https://www.mhanational.org"
        }
      ]
    },
    {
      category: "Educational Materials",
      items: [
        {
          title: "Understanding Anxiety",
          description: "Learn about anxiety disorders and management techniques",
          url: "https://www.nimh.nih.gov/health/topics/anxiety-disorders"
        },
        {
          title: "Depression Resources",
          description: "Information about depression and treatment options",
          url: "https://www.nimh.nih.gov/health/topics/depression"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-mental-dark mb-2">Mental Health Resources</h1>
          <p className="text-gray-600">Helpful resources for your mental wellness journey</p>
        </motion.div>

        {resources.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-mental-dark mb-4">{section.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((resource, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="card hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-mental-blue mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-3">{resource.description}</p>
                  {resource.phone && (
                    <p className="text-mental-dark font-medium mb-2">📞 {resource.phone}</p>
                  )}
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mental-purple hover:text-purple-700 font-medium inline-flex items-center"
                  >
                    Visit resource →
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8"
        >
          <h3 className="font-semibold text-yellow-800 mb-2">Emergency Notice</h3>
          <p className="text-sm text-yellow-700">
            If you are in crisis or experiencing thoughts of harming yourself or others, 
            please call 988 or go to your nearest emergency room immediately.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;