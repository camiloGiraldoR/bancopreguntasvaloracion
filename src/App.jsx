import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SkillDetail from './components/SkillDetail';

function App() {
  return (
    <div className="flex bg-[#0a0a0a] min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Sidebar - Always visible */}
      <Sidebar />

      {/* Dynamic Content Area */}
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/skill/:skillName" element={<SkillDetail />} />
      </Routes>

      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[20%] w-[30%] h-[30%] bg-purple-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}

export default App;
