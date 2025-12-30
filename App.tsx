import React, { useState, useEffect } from 'react';
import MindMap from './components/MindMap';
import Groups from './components/Groups';
import Flashcards from './components/Flashcards';
import DragDrop from './components/DragDrop';
import Stories from './components/Stories';
import Stats from './components/Stats';
import Modal from './components/Modal';
import { DRUG_DATABASE } from './constants';
import { AppState, Tab } from './types';

const INITIAL_STATE: AppState = {
    currentCardIndex: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    studiedDrugs: new Set(),
    startTime: Date.now(),
    progress: 0
};

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('mindmap');
    const [appState, setAppState] = useState<AppState>(INITIAL_STATE);
    const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Initial load animation for progress bar
    useEffect(() => {
        setTimeout(() => updateProgress(20), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateProgress = (value?: number) => {
        setAppState(prev => {
            let newProgress = prev.progress;
            if (value !== undefined) {
                newProgress = Math.min(100, value);
            } else {
                // Logic based on actions
                const totalGroups = Object.keys(DRUG_DATABASE).length;
                const studied = prev.studiedDrugs.size;
                const flashcardScore = prev.totalAnswers > 0 ? (prev.correctAnswers / prev.totalAnswers) : 0;
                newProgress = Math.round((studied / totalGroups * 50) + (flashcardScore * 50));
            }
            return { ...prev, progress: newProgress };
        });
    };

    const handleGroupClick = (groupId: string) => {
        const group = DRUG_DATABASE[groupId];
        if (!group) return;

        setAppState(prev => {
            const newStudied = new Set(prev.studiedDrugs);
            newStudied.add(groupId);
            return { ...prev, studiedDrugs: newStudied };
        });
        updateProgress();

        setModalContent({
            title: group.title,
            content: (
                <div className="animate-fade-in">
                    <div className="flex justify-center text-6xl mb-6" style={{ color: group.color }}>
                        {group.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 border-b pb-2">Fármacos del grupo:</h3>
                    <ul className="space-y-3">
                        {group.drugs.map((drug, idx) => (
                            <li key={idx} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="font-bold text-gray-800">{drug.name}</div>
                                <div className="text-sm text-gray-500 mt-1">{drug.mechanism}</div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
                        <strong className="block text-blue-800 mb-1">Mecanismo General:</strong>
                        <span className="text-blue-700">{group.mechanism}</span>
                    </div>
                </div>
            )
        });
    };

    const handleFlashcardResult = (correct: boolean) => {
        setAppState(prev => ({
            ...prev,
            correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
            totalAnswers: prev.totalAnswers + 1,
            currentCardIndex: (prev.currentCardIndex + 1) % 10 // Mock 10 cards
        }));
        if (correct) triggerSuccess();
        updateProgress();
    };

    const handleDragDropComplete = (correct: number, total: number) => {
        const percentage = Math.round((correct / total) * 100);
        setModalContent({
            title: "🎯 Resultados",
            content: (
                <div className="text-center">
                    <div className="text-6xl mb-4">{percentage >= 80 ? '🎉' : '💪'}</div>
                    <p className="text-xl mb-2">Puntuación: <strong>{correct}/{total}</strong> ({percentage}%)</p>
                    <p className="text-gray-500">{percentage >= 80 ? '¡Excelente trabajo! Has dominado esta clasificación.' : 'Sigue practicando, ¡vas por buen camino!'}</p>
                </div>
            )
        });
        if (percentage === 100) triggerSuccess();
    };

    const triggerSuccess = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1000);
    };

    const resetApp = () => {
        if (window.confirm('¿Estás seguro de reiniciar todo el progreso?')) {
            setAppState({ ...INITIAL_STATE, startTime: Date.now() });
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 relative min-h-screen z-10">
            {/* Background elements to match the original feel */}
            <div className="fixed inset-0 pointer-events-none -z-10 animate-float-pattern opacity-50">
                <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-10"></div>
                <div className="absolute bottom-[20%] right-[20%] w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-10"></div>
                <div className="absolute top-[40%] right-[40%] w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-10"></div>
            </div>

            <header className="flex flex-col md:flex-row justify-between items-center py-6 mb-8 border-b-4 border-gray-800 animate-slide-down">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-antimetabolitos to-inmuno rounded-2xl flex items-center justify-center text-3xl shadow-lg animate-pulse">
                        💊
                    </div>
                    <h1 className="font-display text-4xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-antimitoticos to-hormonales">
                        FarmaOnco Visual
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:block font-bold text-gray-500 uppercase text-xs tracking-widest">Progreso Total</div>
                    <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden relative shadow-inner">
                        <div 
                            className="h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
                            style={{ width: `${appState.progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                        </div>
                    </div>
                    <div className="font-mono font-bold text-xl w-12 text-right">{appState.progress}%</div>
                </div>
            </header>

            <nav className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide justify-center">
                {[
                    { id: 'mindmap', label: '🧠 Mapa Mental' },
                    { id: 'groups', label: '📚 Grupos' },
                    { id: 'flashcards', label: '🎴 Flashcards' },
                    { id: 'dragdrop', label: '🎯 Ejercicios' },
                    { id: 'stories', label: '📖 Historias' },
                    { id: 'stats', label: '📊 Estadísticas' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`
                            px-6 py-3 rounded-xl font-mono font-bold text-sm whitespace-nowrap transition-all duration-300 relative overflow-hidden
                            ${activeTab === tab.id 
                                ? 'bg-gradient-to-br from-antimitoticos to-hormonales text-white shadow-lg scale-105' 
                                : 'bg-white text-gray-600 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md'}
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            <main className="min-h-[500px]">
                {activeTab === 'mindmap' && <MindMap onGroupClick={handleGroupClick} />}
                {activeTab === 'groups' && <Groups onGroupClick={handleGroupClick} />}
                {activeTab === 'flashcards' && <Flashcards appState={appState} updateStats={handleFlashcardResult} />}
                {activeTab === 'dragdrop' && <DragDrop onComplete={handleDragDropComplete} />}
                {activeTab === 'stories' && <Stories />}
                {activeTab === 'stats' && <Stats appState={appState} onReset={resetApp} />}
            </main>

            <Modal 
                isOpen={!!modalContent} 
                onClose={() => setModalContent(null)}
                title={modalContent?.title || ''}
            >
                {modalContent?.content}
            </Modal>

            {showSuccess && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl z-[2000] animate-success-bounce pointer-events-none">
                    ✨
                </div>
            )}
        </div>
    );
};

export default App;
