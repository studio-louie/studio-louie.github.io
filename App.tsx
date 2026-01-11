
import React, { useState, useEffect } from 'react';
import { MasterSword } from './components/MasterSword';
import { OracleChat } from './components/OracleChat';
import { motion, AnimatePresence } from 'framer-motion';
import { Undo2 } from 'lucide-react';

const WindOverlay = () => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {/* Background with blur and wind color */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/80 to-transparent backdrop-blur-sm" />
      
      {/* Decorative Wind Lines */}
      <div className="absolute inset-0 opacity-50">
         <svg className="w-full h-full" preserveAspectRatio="none">
            <motion.path 
               d="M-100,50 Q400,100 800,50 T1600,100" 
               stroke="white" 
               strokeWidth="200" 
               fill="none" 
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 0.5 }}
               transition={{ duration: 0.5 }}
            />
             <motion.path 
               d="M-100,800 Q400,700 800,800 T1600,700" 
               stroke="white" 
               strokeWidth="300" 
               fill="none" 
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 0.3 }}
               transition={{ duration: 0.6, delay: 0.1 }}
            />
         </svg>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [clashed, setClashed] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [isWindBlowing, setIsWindBlowing] = useState(false);

  useEffect(() => {
    // Sequence the animation
    const timer1 = setTimeout(() => {
      setClashed(true);
    }, 100); 

    const timer2 = setTimeout(() => {
      setShowTitle(true);
    }, 800); // Title appears shortly after clash

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generalized transition handler for both navigating to a topic and going back
  const handleTransition = (nextTopic: string | null) => {
    setIsWindBlowing(true);
    
    // Wait for the wind overlay to cover the screen (0.8s)
    setTimeout(() => {
      setActiveTopic(nextTopic);
      // Reset scroll to top instantly while the screen is covered
      window.scrollTo(0, 0);
      
      // Allow a brief moment for the DOM to update before removing the wind
      setTimeout(() => {
        setIsWindBlowing(false);
      }, 100);
    }, 800);
  };

  const handleTopicNavigation = (topic: string) => {
    if (activeTopic === topic) return;
    handleTransition(topic);
  };

  const handleBack = () => {
    handleTransition(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 overflow-x-hidden font-body selection:bg-hylian-gold selection:text-black">
      
      {/* Wind Transition Overlay */}
      <AnimatePresence>
        {isWindBlowing && <WindOverlay />}
      </AnimatePresence>

      {/* --- HOME VIEW (Header, Games, Explore) --- */}
      {!activeTopic && (
        <>
          {/* HEADER / HERO SECTION */}
          <header className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
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
                 {/* Inner container for continuous clash animation */}
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
                 {/* Inner container for continuous clash animation */}
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
                <button 
                  onClick={() => scrollToSection('games')}
                  className="group relative px-4 py-2"
                >
                  <span className="font-fantasy text-2xl md:text-3xl text-hylian-gold tracking-widest group-hover:text-yellow-200 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    GAMES
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hylian-gold group-hover:w-full transition-all duration-300 ease-out" />
                </button>
                
                <button 
                  onClick={() => scrollToSection('explore')}
                  className="group relative px-4 py-2"
                >
                  <span className="font-fantasy text-2xl md:text-3xl text-hylian-gold tracking-widest group-hover:text-yellow-200 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    EXPLORE
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hylian-gold group-hover:w-full transition-all duration-300 ease-out" />
                </button>
              </motion.div>

            </div>
          </header>

          {/* GAMES SECTION */}
          <section id="games" className="min-h-screen bg-[#080808] relative py-24 px-6 border-t border-gray-900/50 flex flex-col items-center justify-start">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="font-fantasy text-4xl md:text-6xl text-hylian-gold mb-6 drop-shadow-md">Realm of Challenges</h2>
                <div className="w-full h-64 flex items-center justify-center border border-gray-800 rounded-lg bg-[#111] text-gray-600 font-fantasy text-xl">
                  Coming Soon...
                </div>
              </motion.div>
            </div>
          </section>

          {/* EXPLORE SECTION */}
          <section id="explore" className="min-h-screen bg-[#050505] relative py-24 px-6 border-t border-gray-900 flex flex-col items-center">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050505] to-[#050505] pointer-events-none" />
             
             <div className="max-w-4xl w-full relative z-10">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
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
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.2 }}
               >
                 <OracleChat onNavigate={handleTopicNavigation} />
               </motion.div>
             </div>
          </section>
        </>
      )}

      {/* --- TOPIC VIEW (Knowledge Sections) --- */}
      {activeTopic && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#0a0a0a] relative flex flex-col items-center justify-center py-24 px-6"
        >
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-hylian-blue/90 border border-hylian-gold/50 rounded-full text-hylian-gold font-fantasy tracking-wider hover:bg-blue-900 transition-all hover:scale-105 shadow-[0_0_15px_rgba(200,169,71,0.3)] group"
          >
            <Undo2 className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            BACK
          </button>

          {activeTopic === 'video-games' && (
            <div className="max-w-7xl mx-auto text-center animate-in fade-in zoom-in duration-700">
              <h2 className="font-fantasy text-4xl md:text-7xl text-hylian-gold mb-8 drop-shadow-[0_0_10px_rgba(200,169,71,0.3)]">Video Game Knowledge</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-hylian-gold to-transparent mx-auto mb-8" />
              <p className="text-gray-400 text-xl md:text-2xl font-light italic">The archives are currently sealed...</p>
            </div>
          )}

          {activeTopic === 'books' && (
             <div className="max-w-7xl mx-auto text-center animate-in fade-in zoom-in duration-700">
              <h2 className="font-fantasy text-4xl md:text-7xl text-hylian-gold mb-8 drop-shadow-[0_0_10px_rgba(200,169,71,0.3)]">Book Knowledge</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-hylian-gold to-transparent mx-auto mb-8" />
              <p className="text-gray-400 text-xl md:text-2xl font-light italic">Ancient tomes await discovery...</p>
            </div>
          )}

          {activeTopic === 'manga-anime' && (
             <div className="max-w-7xl mx-auto text-center animate-in fade-in zoom-in duration-700">
              <h2 className="font-fantasy text-4xl md:text-7xl text-hylian-gold mb-8 drop-shadow-[0_0_10px_rgba(200,169,71,0.3)]">Manga & Anime Knowledge</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-hylian-gold to-transparent mx-auto mb-8" />
              <p className="text-gray-400 text-xl md:text-2xl font-light italic">Scrolls of legend are being gathered...</p>
            </div>
          )}
        </motion.div>
      )}

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-900 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                 <MasterSword className="w-6 h-16" />
                 <span className="font-fantasy text-xl text-gray-500">Louie World</span>
            </div>
            <div className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Louie World. Crafted with React & Tailwind.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
