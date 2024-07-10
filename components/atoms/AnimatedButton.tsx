import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = () => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 block">
      Get in touch!
    </button>
  );
};

export default AnimatedButton;
