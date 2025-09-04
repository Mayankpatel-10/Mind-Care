import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    emergencyContact: '',
    preferences: {
      darkMode: false,
      notifications: true,
      weeklyReports: true
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // Show success message
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-mental-dark">Profile Settings</h1>
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-mental-purple rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
                <p className="text-gray-600 capitalize">{currentUser?.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field"
                placeholder="Name and phone number"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-mental-dark mb-3">Preferences</h3>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="preferences.darkMode"
                    checked={formData.preferences.darkMode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="rounded text-mental-blue focus:ring-mental-blue"
                  />
                  <span className="ml-2 text-gray-700">Dark mode</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="preferences.notifications"
                    checked={formData.preferences.notifications}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="rounded text-mental-blue focus:ring-mental-blue"
                  />
                  <span className="ml-2 text-gray-700">Email notifications</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="preferences.weeklyReports"
                    checked={formData.preferences.weeklyReports}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="rounded text-mental-blue focus:ring-mental-blue"
                  />
                  <span className="ml-2 text-gray-700">Weekly progress reports</span>
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mt-6"
        >
          <h2 className="text-xl font-semibold text-mental-dark mb-4">Account Actions</h2>
          
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100">
              Export My Data
            </button>
            
            <button className="w-full text-left p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100">
              Delete Account
            </button>
            
            <button className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-100">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;