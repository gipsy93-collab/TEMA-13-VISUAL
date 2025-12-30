import React, { useState } from 'react';
import { FLASHCARDS } from '../constants';
import { AppState } from '../types';

interface FlashcardsProps {
    appState: AppState;
    updateStats: (correct: boolean) => void;
}

const Flashcards: React.FC<FlashcardsProps> = ({ appState, updateStats }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [animateCard, setAnimateCard] = useState(false);

    const currentCard = FLASHCARDS[appState.currentCardIndex];

    const handleNext = (correct: boolean) => {
        setIsFlipped(false);
        setAnimateCard(true);
        // Wait for flip back animation
        setTimeout(() => {
            updateStats(correct);
            setAnimateCard(false);
        }, 300);
    };

    return (
        <div className="flex flex-col items-center gap-8 animate-fade-in w-full max-w-lg mx-auto">
            <div 
                className={`w-full h-72 cursor-pointer perspective-1000 group`}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''} ${animateCard ? 'scale-95 opacity-50' : ''}`}>
                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
                        <div className="text-5xl mb-4">💊</div>
                        <div className="font-display text-4xl mb-4 tracking-wider">{currentCard.question}</div>
                        <div className="text-sm italic opacity-80 mt-4">Clic para ver la respuesta</div>
                    </div>

                    {/* Back */}
                    <div className="absolute w-full h-full backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl bg-white border-4 border-antimitoticos rotate-y-180">
                        <div className="font-main text-lg leading-relaxed whitespace-pre-line text-gray-800">
                            {currentCard.answer}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 w-full justify-center">
                <button 
                    onClick={() => handleNext(false)}
                    className="flex-1 max-w-[150px] py-3 bg-red-500 text-white rounded-xl font-mono font-bold hover:bg-red-600 hover:scale-105 transition-all shadow-md border-b-4 border-red-700 active:border-b-0 active:translate-y-1"
                >
                    ❌ No lo sabía
                </button>
                <button 
                    onClick={() => handleNext(true)}
                    className="flex-1 max-w-[150px] py-3 bg-green-500 text-white rounded-xl font-mono font-bold hover:bg-green-600 hover:scale-105 transition-all shadow-md border-b-4 border-green-700 active:border-b-0 active:translate-y-1"
                >
                    ✅ Correcto
                </button>
            </div>

            <div className="text-center font-mono text-gray-600">
                Tarjeta <span className="font-bold">{appState.currentCardIndex + 1}</span> de <span className="font-bold">{FLASHCARDS.length}</span>
            </div>
        </div>
    );
};

export default Flashcards;
