import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, HelpCircle, CheckCircle2, Award, Zap, Trophy, Sparkles, Loader2 } from 'lucide-react';
import skillsData from '../data/skills.json';
import { getSkillDescription } from '../services/aiService';

const SkillDetail = () => {
    const { skillName } = useParams();
    const [activeLevel, setActiveLevel] = useState('junior');
    const [showAnswer, setShowAnswer] = useState({});
    const [description, setDescription] = useState('');
    const [isDescLoading, setIsDescLoading] = useState(true);

    useEffect(() => {
        const fetchDescription = async () => {
            setIsDescLoading(true);
            const desc = await getSkillDescription(skillName);
            setDescription(desc);
            setIsDescLoading(false);
        };
        fetchDescription();
    }, [skillName]);

    // Find the skill in our data
    const decodedSkillName = decodeURIComponent(skillName);
    let currentSkill = null;
    skillsData.forEach(group => {
        const skill = group.skills.find(s => s.name === decodedSkillName);
        if (skill) currentSkill = skill;
    });

    if (!currentSkill) {
        return (
            <div className="flex-1 ml-80 min-h-screen bg-[#0a0a0a] text-white p-8 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Skill not found</h2>
                <Link to="/" className="text-blue-400 hover:underline">Return to Dashboard</Link>
            </div>
        );
    }

    const filteredQuestions = currentSkill.questions.filter(q => q.level === activeLevel);

    const toggleAnswer = (idx) => {
        setShowAnswer(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const levels = [
        { id: 'junior', label: 'Junior', icon: <Zap size={16} />, color: 'from-green-500 to-emerald-400' },
        { id: 'intermediate', label: 'Intermediate', icon: <Award size={16} />, color: 'from-blue-500 to-cyan-400' },
        { id: 'senior', label: 'Senior', icon: <Trophy size={16} />, color: 'from-purple-600 to-pink-500' },
    ];

    return (
        <main className="flex-1 ml-80 min-h-screen bg-[#0a0a0a] text-white p-8">
            <header className="mb-8">
                <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 text-sm font-medium uppercase tracking-widest">
                    <ChevronLeft size={16} />
                    Back to Dashboard
                </Link>
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black tracking-tight">{currentSkill.name}</h1>
                            <div className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center gap-1.5 mt-1">
                                <Sparkles size={12} className="text-blue-400" />
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">AI Enhanced</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-[0.2em]">Technical Assessment Questions</p>
                    </div>
                </div>
            </header>

            {/* AI Description Section */}
            <section className="mb-10">
                <AnimatePresence mode="wait">
                    {isDescLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 min-h-[120px] flex items-center justify-center gap-3"
                        >
                            <Loader2 className="animate-spin text-blue-500" size={20} />
                            <p className="text-gray-500 text-sm font-medium">Generando análisis experto...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Info size={80} />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Sparkles size={14} />
                                    Teoría y Características
                                </h2>
                                <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                                    {description}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Levels Tabs */}
            <div className="flex gap-4 mb-8">
                {levels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => {
                            setActiveLevel(level.id);
                            setShowAnswer({});
                        }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 font-bold ${activeLevel === level.id
                            ? `bg-gradient-to-br ${level.color} border-transparent text-white shadow-lg shadow-${level.id}/20`
                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10'
                            }`}
                    >
                        {level.icon}
                        {level.label}
                    </button>
                ))}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden group"
                        >
                            <div className="p-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-blue-400">
                                        <HelpCircle size={24} />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-xl font-bold leading-relaxed">{q.question}</h3>

                                        <button
                                            onClick={() => toggleAnswer(idx)}
                                            className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold uppercase tracking-widest transition-all"
                                        >
                                            {showAnswer[idx] ? 'Hide Answer' : 'Show Answer'}
                                        </button>

                                        <AnimatePresence>
                                            {showAnswer[idx] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-white/5 rounded-3xl p-6 border border-white/5"
                                                >
                                                    <div className="flex gap-4">
                                                        <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
                                                        <p className="text-gray-300 leading-relaxed italic">{q.answer}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="rounded-[3rem] bg-white/[0.02] border border-white/5 p-20 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-gray-600 mb-6">
                            <Info size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No questions curated yet</h3>
                        <p className="text-gray-500 max-w-xs text-sm">We are currently formulating professional questions for this skill level.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default SkillDetail;
