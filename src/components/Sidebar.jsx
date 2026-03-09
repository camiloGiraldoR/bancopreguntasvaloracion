import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, LayoutDashboard, Database, Cpu, Layers, ShieldCheck, Code2, Globe, TestTube2, Cloud, Search, X } from 'lucide-react';
import skillsData from '../data/skills.json';

const Sidebar = () => {
    const location = useLocation();
    const [expandedGroups, setExpandedGroups] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const activeGroup = skillsData.find(group =>
            group.skills.some(skill => `/skill/${encodeURIComponent(skill.name)}` === location.pathname)
        );
        if (activeGroup) {
            setExpandedGroups(prev => ({
                ...prev,
                [activeGroup.group]: true
            }));
        }
    }, [location.pathname]);

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const handleSkillClick = (groupName) => {
        setSearchTerm('');
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: true
        }));
    };

    const filteredData = skillsData.map(item => {
        const matchingSkills = item.skills.filter(skill =>
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const groupMatches = item.group.toLowerCase().includes(searchTerm.toLowerCase());

        if (groupMatches || matchingSkills.length > 0) {
            return {
                ...item,
                skills: searchTerm.length > 0 && !groupMatches ? matchingSkills : item.skills,
                isAutoExpanded: searchTerm.length > 0
            };
        }
        return null;
    }).filter(Boolean);

    const getIcon = (group) => {
        const name = group.toLowerCase();
        if (name.includes('java')) return <Code2 size={18} />;
        if (name.includes('architecture')) return <Layers size={18} />;
        if (name.includes('sql') || name.includes('data')) return <Database size={18} />;
        if (name.includes('cloud')) return <Cloud size={18} />;
        if (name.includes('test')) return <TestTube2 size={18} />;
        if (name.includes('security')) return <ShieldCheck size={18} />;
        if (name.includes('rest')) return <Globe size={18} />;
        if (name.includes('jvm')) return <Cpu size={18} />;
        return <LayoutDashboard size={18} />;
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-80 bg-[#121212] border-r border-white/10 text-gray-300 overflow-y-auto no-scrollbar shadow-2xl z-50">
            <div className="p-6 border-b border-white/5">
                <Link to="/" className="block group">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-400 transition-all">
                        Skills Explorer
                    </h2>
                </Link>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">Perficient Assessment</p>
            </div>

            <div className="px-4 mt-6">
                <div className="relative group/search">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/search:text-blue-400 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-sm text-gray-200 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            <nav className="mt-4 px-3 space-y-1 pb-20">
                {filteredData.length === 0 ? (
                    <div className="p-10 text-center">
                        <p className="text-gray-500 text-sm">No skills found matching "{searchTerm}"</p>
                    </div>
                ) : filteredData.map((item, index) => {
                    const isGroupActive = item.skills.some(
                        skill => `/skill/${encodeURIComponent(skill.name)}` === location.pathname
                    );
                    const isExpanded = expandedGroups[item.group] || item.isAutoExpanded;

                    return (
                        <div key={index} className="group/item">
                            <button
                                onClick={() => toggleGroup(item.group)}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${isExpanded
                                    ? 'bg-blue-500/5 text-blue-400'
                                    : 'hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`${isExpanded
                                        ? 'text-blue-400'
                                        : 'text-gray-500 group-hover/item:text-blue-300'
                                        } transition-colors`}>
                                        {getIcon(item.group)}
                                    </span>
                                    <span className={`text-sm font-medium leading-tight ${isGroupActive ? 'text-white' : ''
                                        }`}>{item.group}</span>
                                </div>
                                <motion.span
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-gray-600"
                                >
                                    <ChevronRight size={16} />
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden ml-6 mr-1"
                                    >
                                        <div className="py-2 space-y-1 border-l border-white/5 ml-4 pl-4 mt-1">
                                            {item.skills.map((skill, sIdx) => {
                                                const skillPath = `/skill/${encodeURIComponent(skill.name)}`;
                                                const isActive = location.pathname === skillPath;

                                                return (
                                                    <Link
                                                        key={sIdx}
                                                        to={skillPath}
                                                        className="block"
                                                        onClick={() => handleSkillClick(item.group)}
                                                    >
                                                        <motion.div
                                                            initial={{ x: -10, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: sIdx * 0.02 }}
                                                            className={`text-xs py-2 px-3 rounded-lg transition-all border flex items-center justify-between group/skill ${isActive
                                                                ? 'bg-blue-500/10 text-white border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)] font-bold'
                                                                : 'text-gray-500 hover:text-blue-300 hover:bg-white/5 border-transparent'
                                                                }`}
                                                        >
                                                            <span>{skill.name}</span>
                                                            {isActive && (
                                                                <motion.div
                                                                    layoutId="active-pill"
                                                                    className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                                                />
                                                            )}
                                                        </motion.div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
