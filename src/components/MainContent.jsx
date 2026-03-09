import React from 'react';
import { Filter, Download, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const MainContent = () => {
    return (
        <main className="flex-1 ml-80 min-h-screen bg-[#0a0a0a] text-white p-8">
            {/* Header */}
            <header className="flex items-center justify-between mb-12">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Dashboard</h1>
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-[0.2em]">Perficient Technical Assessment Portfolio</p>
                </div>

                <div className="flex items-center gap-4">
                </div>
            </header>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Total Skill Groups', value: '14', icon: <Filter />, color: 'from-blue-500 to-cyan-400' },
                    { label: 'Verified Skills', value: '175', icon: <Star />, color: 'from-purple-600 to-pink-500' },
                    { label: 'Assessed By', value: 'Technical Leads', icon: <Download />, color: 'from-orange-500 to-yellow-400' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 group cursor-default"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} p-[1px] mb-4`}>
                            <div className="w-full h-full rounded-[15px] bg-[#0a0a0a] flex items-center justify-center text-white">
                                {stat.icon}
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-1 font-mono tracking-tighter">{stat.label}</p>
                        <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Main Grid Content Area (Placeholder for actual content implementation) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="rounded-[3rem] bg-white/[0.02] border border-white/5 p-10 min-h-[400px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10 group-hover:bg-blue-500/20 transition-colors" />
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-blue-500 rounded-full" />
                        Selection Overview
                    </h4>
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-20 h-20 rounded-full border-4 border-dashed border-white/10 mb-6 flex items-center justify-center">
                            <span className="text-gray-600 font-mono text-2xl">?</span>
                        </div>
                        <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                            Select a category from the left sidebar to explore detailed skill valuations and assessments.
                        </p>
                    </div>
                </div>

                <div className="rounded-[3rem] bg-white/[0.02] border border-white/5 p-10 min-h-[400px] relative overflow-hidden group">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] -z-10 group-hover:bg-purple-500/20 transition-colors" />
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-purple-500 rounded-full" />
                        Progression Chart
                    </h4>
                    <div className="space-y-6">
                        {[85, 70, 95, 60].map((progress, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-gray-500">
                                    <span>Metric {i + 1}</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.2, ease: "circOut" }}
                                        className={`h-full bg-gradient-to-r ${i % 2 === 0 ? 'from-blue-500 to-cyan-400' : 'from-purple-600 to-pink-500'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="mt-12 text-center text-gray-600 text-xs font-medium uppercase tracking-widest">
                Built with Antigravity &mdash; 2026 Admin Dashboard
            </footer>
        </main>
    );
};

export default MainContent;
