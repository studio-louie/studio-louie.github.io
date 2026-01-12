
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import { OracleChat } from '../components/OracleChat';

export const Explore: React.FC = () => {
  const [activeKnowledge, setActiveKnowledge] = useState<string | null>(null);

  const handleTopicNavigation = (topic: string) => {
    setActiveKnowledge(topic);
  };

  return (
    <div className="min-h-screen bg-[#050505] relative py-24 px-6 border-t border-gray-900 flex flex-col items-center">
      <Link 
        to="/"
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-hylian-blue/90 border border-hylian-gold/50 rounded-full text-hylian-gold font-fantasy tracking-wider hover:bg-blue-900 transition-all hover:scale-105 shadow-[0_0_15px_rgba(200,169,71,0.3)] group"
      >
        <Undo2 className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        BACK
      </Link>

      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050505] to-[#050505] pointer-events-none" />
      
      {!activeKnowledge ? (
        <div className="max-w-4xl w-full relative z-10 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
             <h2 className="font-fantasy text-4xl md:text-6xl text-hylian-gold mb-6 drop-shadow-md">Consult the Oracle</h2>
             <div className="w-24 h-1 bg-gradient-to-r from-transparent via-hylian-gold to-transparent mx-auto mb-6" />
             <p className="text-gray-400 text-lg font-light">
               The spirits of Louie World are ancient and knowing. Ask, and the Oracle shall reveal the secrets of this land.
             </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OracleChat onNavigate={handleTopicNavigation} />
          </motion.div>
        </div>
      ) : (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-7xl relative flex flex-col items-center justify-center py-24 px-6"
        >
          <button 
            onClick={() => setActiveKnowledge(null)}
            className="mb-8 flex items-center gap-2 text-hylian-gold hover:text-white transition-colors"
          >
             <Undo2 className="w-4 h-4" /> Return to Oracle
          </button>

          {activeKnowledge === 'video-games' && (
            <div className="text-center animate-in fade-in zoom-in duration-700">
              <h2 className="font-fantasy text-4xl md:text-7xl text-hylian-gold mb-8 drop-shadow-[0_0_10px_rgba(200,169,71,0.3)]">Video Game Knowledge</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-hylian-gold to-transparent mx-auto mb-8" />
              <p className="text-gray-400 text-xl md:text-2xl font-light italic">The archives are currently sealed...</p>
            </div>
          )}

          {activeKnowledge === 'books' && (
             <div className="text-center animate-in fade-in zoom-in duration-700">
              <h2 className="font-fantasy text-4xl md:text-7xl text-hylian-gold mb-8 drop-shadow-[0_0_10px_rgba(200,169,71,0.3)]">Book Knowledge</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-hylian-gold to-transparent mx-auto mb-8" />
              <p className="text-gray-400 text-xl md:text-2xl font-light italic">Ancient tomes await discovery...</p>
            </div>
          )}

          {activeKnowledge === 'manga-anime' && (
             <div className="text-center animate-in fade-in zoom-in duration-700">
              <h2 className="font-fantasy text-4xl md:text-7xl text-hylian-gold mb-8 drop-shadow-[0_0_10px_rgba(200,169,71,0.3)]">Manga & Anime Knowledge</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-hylian-gold to-transparent mx-auto mb-8" />
              <p className="text-gray-400 text-xl md:text-2xl font-light italic">Scrolls of legend are being gathered...</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
