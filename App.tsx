import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MasterSword } from './components/MasterSword';
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { Explore } from './pages/Explore';

// Separate component to handle route change animations if desired, 
// or just global overlays like the Wind
const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 overflow-x-hidden font-body selection:bg-hylian-gold selection:text-black">
       {/* You can add global transition animations here based on location.key */}
       <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/explore" element={<Explore />} />
       </Routes>

       {/* Global Footer */}
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

const App: React.FC = () => {
  return (
    // Using HashRouter is safer for GitHub Pages to avoid 404s on refresh
    <Router>
      <Layout />
    </Router>
  );
};

export default App;