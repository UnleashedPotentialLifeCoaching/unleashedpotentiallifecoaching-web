import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ['0%', '0%', '50%', '50%', '0%'],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      <button className="px-4 py-4 bg-transparent text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 block">
        <div className="border py-4 px-6">{children}</div>
      </button>
    </motion.div>
  );
};

export default AnimatedButton;
