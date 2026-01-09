import { Member, Memory } from '../types/firestore';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface VaultProps {
    currentUser: Member;
    memories: Memory[];
    members: Member[];
}

export function Vault({ currentUser, memories, members }: VaultProps) {
    const myMemories = memories.filter(m => m.taggedMemberIds.includes(currentUser.id));

    const getMemberData = (id: string) => members.find(m => m.id === id);

    return (
        <div className="space-y-6 pb-24">
            <header className="px-4 pt-4">
                <h2 className="text-3xl font-black text-slate-800">My Vault</h2>
                <p className="text-slate-500 font-bold">Collecting memories...</p>
            </header>

            {/* TIMELINE */}
            <div className="relative pl-8 pr-4 space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-indigo-100 rounded-full -translate-x-1/2" />

                {myMemories.length === 0 ? (
                    <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                        <span className="text-4xl mb-4 block">📭</span>
                        <h3 className="font-bold text-slate-700">No memories yet!</h3>
                        <p className="text-slate-400 text-sm mt-2">Complete a quest to start your collection.</p>
                    </div>
                ) : (
                    myMemories.map((memory, index) => (
                        <motion.div
                            key={memory.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Dot on Timeline */}
                            <div className="absolute left-0 top-6 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white shadow-sm -translate-x-1/2 z-10" />

                            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 ml-6">
                                {/* Date Header */}
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                                    <Calendar size={12} />
                                    {new Date(memory.createdAt).toLocaleDateString()}
                                </div>

                                {/* Content */}
                                <p className="text-lg font-medium text-slate-800 mb-4 leading-relaxed">
                                    {memory.content}
                                </p>

                                {/* Image if present */}
                                {memory.mediaUrl && (
                                    <div className="rounded-2xl overflow-hidden mb-4 border-2 border-slate-100">
                                        <img src={memory.mediaUrl} alt="Memory" className="w-full h-48 object-cover" />
                                    </div>
                                )}

                                {/* Footer: Who else was there? */}
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50">
                                    <div className="flex -space-x-2">
                                        {memory.taggedMemberIds
                                            .filter(id => id !== currentUser.id) // Don't show self in the "Others" list
                                            .map(id => {
                                                const member = getMemberData(id);
                                                if (!member) return null;
                                                return (
                                                    <div
                                                        key={id}
                                                        className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs"
                                                        title={member.name}
                                                    >
                                                        {member.avatarUrl}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    {memory.taggedMemberIds.length > 1 && (
                                        <span className="text-xs font-bold text-slate-400">
                                            was with you
                                        </span>
                                    )}

                                    {/* Mood Tag */}
                                    {memory.mood && (
                                        <div className="ml-auto px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold flex items-center gap-1">
                                            {memory.mood === 'happy' && '😄'}
                                            {memory.mood === 'excited' && '🤩'}
                                            {memory.mood === 'calm' && '😌'}
                                            {memory.mood === 'frustrated' && '😤'}
                                            {memory.mood === 'sad' && '😢'}
                                            <span className="capitalize">{memory.mood}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
