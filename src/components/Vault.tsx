import { Member, Memory } from '../types/firestore';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from './EmptyState';

interface VaultProps {
    currentUser: Member;
    memories: Memory[];
    members: Member[];
}

export function Vault({ currentUser, memories, members }: VaultProps) {
    const { t, i18n } = useTranslation();
    const myMemories = memories.filter(m => m.taggedMemberIds.includes(currentUser.id));

    const getMemberData = (id: string) => members.find(m => m.id === id);

    return (
        <div className="space-y-6 pb-24">
            <header className="px-4 pt-4">
                <h2 className="text-3xl font-black text-slate-800">{t('vault.title')}</h2>
                <p className="text-slate-500 font-bold">{t('vault.subtitle')}</p>
            </header>

            {/* TIMELINE */}
            <div className="relative pl-8 pr-4 space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-indigo-100 rounded-full -translate-x-1/2" />

                {myMemories.length === 0 ? (
                    <EmptyState
                        title="Hér er tómt eins og er"
                        description="Engar minningar fundust. Byrjaðu á að skrá eftirminnilegt augnablik!"
                        action={{
                            label: "Skrá minningu",
                            onClick: () => {
                                // We need a way to open the create view from here. 
                                // Since 'setView' is in App.tsx, we might need to emit an event or use context.
                                // For now, let's assume the parent can pass a handler or we use a custom event.
                                // EDIT: Looking at App.tsx, Vault doesn't have an onCreate prop.
                                // I should check if I can modify Vault props first or handle it differently.
                                // Actually, for this specific task, I can leave the onClick as a TODO or fix the props in the next step.
                                // Better yet, I'll dispatch a custom event that App.tsx listens to, or just accept that I need to update App.tsx to pass a handler.
                                // Let's use a custom event for loose coupling since I can't easily change the prop drilling right now without reading App.tsx again.
                                // Wait, I AM editing Vault.tsx. I can add a prop `onCreate`.
                                const event = new CustomEvent('open-create-memory');
                                window.dispatchEvent(event);
                            }
                        }}
                    />
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
                                    {new Date(memory.createdAt).toLocaleDateString(i18n.language)}
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
                                            {t('vault.was_with_you')}
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
