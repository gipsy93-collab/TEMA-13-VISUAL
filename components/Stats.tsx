import React from 'react';
import { AppState } from '../types';

interface StatsProps {
    appState: AppState;
    onReset: () => void;
}

const StatCard: React.FC<{ icon: string; value: string | number; label: string }> = ({ icon, value, label }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:-translate-y-2 transition-transform duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <div className="font-display text-5xl text-antimitoticos mb-2">{value}</div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</div>
    </div>
);

const Stats: React.FC<StatsProps> = ({ appState, onReset }) => {
    const accuracy = appState.totalAnswers > 0 
        ? Math.round((appState.correctAnswers / appState.totalAnswers) * 100) 
        : 0;
    
    const timeSpent = Math.max(1, Math.round((Date.now() - appState.startTime) / 60000));
    const level = Math.floor(appState.progress / 20) + 1;

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard icon="🎯" value={`${accuracy}%`} label="Precisión" />
                <StatCard icon="📚" value={appState.studiedDrugs.size * 5} label="Fármacos Estudiados" />
                <StatCard icon="⏱️" value={`${timeSpent}m`} label="Tiempo Total" />
                <StatCard icon="🏆" value={level} label="Nivel" />
                <StatCard icon="🔥" value="3" label="Racha de Días" /> {/* Mocked streak for simplicity */}
                <StatCard icon="⚡" value={appState.progress} label="Puntos de Exp" />
            </div>
            
            <div className="text-center">
                <button 
                    onClick={onReset}
                    className="px-8 py-3 bg-white border-2 border-gray-800 rounded-xl font-mono font-bold hover:bg-gray-800 hover:text-white transition-all shadow-md active:translate-y-1"
                >
                    🔄 Reiniciar Progreso
                </button>
            </div>
        </div>
    );
};

export default Stats;
