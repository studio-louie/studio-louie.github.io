
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MasterSword } from '../components/MasterSword';

export const Home: React.FC = () => {
  const [clashed, setClashed] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setClashed(true), 100);
    const timer2 = setTimeout(() => setShowTitle(true), 800);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <header className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Dark Overlay/Background */}
      <div className="absolute inset-0 bg-[#050505] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/80 z-0"></div>

      {/* Animation Container */}
      <div className="relative z-10 w-full max-w-5xl h-[600px] flex items-center justify-center">
        
        {/* Left Sword */}
        <motion.div
          initial={{ x: '-100vw', rotate: -90, opacity: 0 }}
          animate={{ x: 0, rotate: 30, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, damping: 12, duration: 1.5, delay: 0.2 }}
          className="absolute z-20"
          style={{ transformOrigin: 'center center' }}
        >
            <motion.div
              animate={{ x: [0, 5, 0], y: [0, -3, 0], rotate: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1.7 }}
              className="transform translate-x-12 translate-y-12"
            >
              <MasterSword className="w-64 h-[500px] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" glow={clashed} />
            </motion.div>
        </motion.div>

        {/* Right Sword */}
        <motion.div
          initial={{ x: '100vw', rotate: 90, opacity: 0 }}
          animate={{ x: 0, rotate: -30, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, damping: 12, duration: 1.5, delay: 0.2 }}
          className="absolute z-20"
          style={{ transformOrigin: 'center center' }}
        >
            <motion.div
              animate={{ x: [0, -5, 0], y: [0, -2, 0], rotate: [0, -1, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.7 }}
              className="transform -translate-x-12 translate-y-12"
            >
              <MasterSword className="w-64 h-[500px] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" glow={clashed} />
            </motion.div>
        </motion.div>

        {/* Clash Flash Effect */}
        <AnimatePresence>
          {clashed && !showTitle && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute z-30 w-32 h-32 bg-yellow-100 rounded-full blur-xl"
            />
          )}
        </AnimatePresence>
        
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={showTitle ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute z-40 text-center w-full px-4"
        >
          <h1 className="font-fantasy font-bold text-5xl md:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#fffbe6] via-[#fcd34d] to-[#b45309] drop-shadow-[0_4px_4px_rgba(0,0,0,1)] drop-shadow-[0_0_20px_rgba(234,179,8,0.2)] tracking-wider">
            LOUIE WORLD
          </h1>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={showTitle ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-[-150px] md:bottom-[-100px] z-50 flex gap-12 md:gap-24"
        >
          <Link to="/games" className="group relative px-4 py-2">
            <span className="font-fantasy text-2xl md:text-3xl text-hylian-gold tracking-widest group-hover:text-yellow-200 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              GAMES
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hylian-gold group-hover:w-full transition-all duration-300 ease-out" />
          </Link>
          
          <Link to="/explore" className="group relative px-4 py-2">
            <span className="font-fantasy text-2xl md:text-3xl text-hylian-gold tracking-widest group-hover:text-yellow-200 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              EXPLORE
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hylian-gold group-hover:w-full transition-all duration-300 ease-out" />
          </Link>
        </motion.div>

      </div>
    </header>
  );
};
