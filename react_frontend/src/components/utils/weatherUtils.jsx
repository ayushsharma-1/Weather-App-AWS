import React from 'react';
import { 
  FiArrowUp, 
  FiArrowUpRight,
  FiArrowRight, 
  FiArrowDownRight, 
  FiArrowDown,
  FiArrowDownLeft, 
  FiArrowLeft,
  FiArrowUpLeft
} from 'react-icons/fi';

// Format time function
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Format date
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' });
};

// Function to get wind direction icon
export const getWindDirectionIcon = (degrees) => {
  if (degrees >= 337.5 || degrees < 22.5) {
    return <FiArrowUp className="wind-direction-icon" />;
  } else if (degrees >= 22.5 && degrees < 67.5) {
    return <FiArrowUpRight className="wind-direction-icon" />;
  } else if (degrees >= 67.5 && degrees < 112.5) {
    return <FiArrowRight className="wind-direction-icon" />;
  } else if (degrees >= 112.5 && degrees < 157.5) {
    return <FiArrowDownRight className="wind-direction-icon" />;
  } else if (degrees >= 157.5 && degrees < 202.5) {
    return <FiArrowDown className="wind-direction-icon" />;
  } else if (degrees >= 202.5 && degrees < 247.5) {
    return <FiArrowDownLeft className="wind-direction-icon" />;
  } else if (degrees >= 247.5 && degrees < 292.5) {
    return <FiArrowLeft className="wind-direction-icon" />;
  } else {
    return <FiArrowUpLeft className="wind-direction-icon" />;
  }
};

export default {
  formatTime,
  formatDate,
  getWindDirectionIcon
};