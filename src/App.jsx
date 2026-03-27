import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SkillDetail from './components/SkillDetail';

function App() {
  return (
    <div className="flex bg-[#0a0a0a] min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden relative">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* Sidebar - Fixed with specific width */}
      <div className="w-80 flex-shrink-0 z-20">
        <Sidebar />
      </div>

      {/* Main Content Area - Scrollable with padding */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden relative z-10 scroll-smooth">
        <div className="min-h-full max-w-7xl mx-auto w-full p-6 lg:p-10">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/skill/:skillName" element={<SkillDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
