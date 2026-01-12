
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Undo2 } from 'lucide-react';

export const Games: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080808] relative py-24 px-6 border-t border-gray-900/50 flex flex-col items-center justify-start">
      <Link 
        to="/"
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-hylian-blue/90 border border-hylian-gold/50 rounded-full text-hylian-gold font-fantasy tracking-wider hover:bg-blue-900 transition-all hover:scale-105 shadow-[0_0_15px_rgba(200,169,71,0.3)] group"
      >
        <Undo2 className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        BACK
      </Link>

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-fantasy text-4xl md:text-6xl text-hylian-gold mb-6 drop-shadow-md">Realm of Challenges</h2>
          <div className="w-full h-64 flex items-center justify-center border border-gray-800 rounded-lg bg-[#111] text-gray-600 font-fantasy text-xl">
            Coming Soon...
          </div>
        </motion.div>
      </div>
    </div>
  );
};
