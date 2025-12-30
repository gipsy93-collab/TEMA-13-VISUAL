import React, { useState } from 'react';
import { DRUG_DATABASE } from '../constants';

interface DragItem {
    id: string;
    name: string;
    correctGroup: string;
}

const ITEMS: DragItem[] = [
    { id: 'item1', name: "Metotrexate", correctGroup: "antimetabolitos" },
    { id: 'item2', name: "Ifosfamida", correctGroup: "adn-arn" },
    { id: 'item3', name: "Vincristina", correctGroup: "antimitoticos" },
    { id: 'item4', name: "Tamoxifeno", correctGroup: "hormonales" },
    { id: 'item5', name: "Vacuna BCG", correctGroup: "inmuno" },
    { id: 'item6', name: "5-Fluoruracilo", correctGroup: "antimetabolitos" },
    { id: 'item7', name: "Doxorrubicina", correctGroup: "adn-arn" },
    { id: 'item8', name: "Paclitaxel", correctGroup: "antimitoticos" },
    { id: 'item9', name: "Flutamida", correctGroup: "hormonales" },
    { id: 'item10', name: "Cetuximab", correctGroup: "inmuno" },
];

const DragDrop: React.FC<{ onComplete: (score: number, total: number) => void }> = ({ onComplete }) => {
    const [items, setItems] = useState<DragItem[]>(ITEMS);
    const [placements, setPlacements] = useState<{ [key: string]: string[] }>({
        antimetabolitos: [],
        "adn-arn": [],
        antimitoticos: [],
        hormonales: [],
        inmuno: [],
    });
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [results, setResults] = useState<{ [key: string]: boolean | null }>({});
    const [checked, setChecked] = useState(false);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("text/plain", id);
        setDraggingId(id);
    };

    const handleDrop = (e: React.DragEvent, targetGroupId: string) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        
        // Remove from list if it was there
        setItems(prev => prev.filter(i => i.id !== id));
        
        // Remove from other zones if it was there
        const newPlacements = { ...placements };
        Object.keys(newPlacements).forEach(key => {
            newPlacements[key] = newPlacements[key].filter(itemId => itemId !== id);
        });

        // Add to new zone
        newPlacements[targetGroupId] = [...newPlacements[targetGroupId], id];
        setPlacements(newPlacements);
        setDraggingId(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const checkAnswers = () => {
        let correctCount = 0;
        let totalPlaced = 0;
        const newResults: { [key: string]: boolean } = {};

        Object.keys(placements).forEach(groupId => {
            placements[groupId].forEach(itemId => {
                totalPlaced++;
                const item = ITEMS.find(i => i.id === itemId);
                if (item) {
                    const isCorrect = item.correctGroup === groupId;
                    newResults[itemId] = isCorrect;
                    if (isCorrect) correctCount++;
                }
            });
        });

        setResults(newResults);
        setChecked(true);
        onComplete(correctCount, totalPlaced);
    };

    const reset = () => {
        setItems(ITEMS);
        setPlacements({
            antimetabolitos: [],
            "adn-arn": [],
            antimitoticos: [],
            hormonales: [],
            inmuno: [],
        });
        setResults({});
        setChecked(false);
    };

    return (
        <div className="flex flex-col gap-8 animate-slide-up">
            <h2 className="font-display text-3xl text-center mb-4">🎯 Clasifica los Fármacos</h2>
            
            <div className="flex flex-wrap gap-4 p-6 bg-white rounded-2xl min-h-[100px] border-4 border-dashed border-gray-100 shadow-inner">
                {items.map(item => (
                    <div
                        key={item.id}
                        draggable={!checked}
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        className={`px-5 py-2 bg-gradient-to-br from-purple-500 to-orange-400 text-white rounded-lg cursor-grab font-mono font-bold shadow-md hover:scale-105 active:scale-95 transition-all ${draggingId === item.id ? 'opacity-50' : ''}`}
                    >
                        {item.name}
                    </div>
                ))}
                {items.length === 0 && !checked && (
                    <div className="w-full text-center text-gray-400 italic self-center">Arrastra los elementos a los contenedores abajo</div>
                )}
                 {items.length === 0 && checked && (
                    <div className="w-full text-center text-gray-400 italic self-center">¡Completado!</div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Object.values(DRUG_DATABASE).map(group => (
                    <div 
                        key={group.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, group.id)}
                        className="min-h-[160px] bg-white border-2 border-dashed border-gray-200 rounded-2xl p-4 transition-all hover:border-green-400 hover:bg-green-50"
                    >
                        <div className="font-display text-xl text-center mb-3" style={{ color: group.color }}>
                            {group.icon} {group.title.split(' ')[0]}
                        </div>
                        <div className="flex flex-col gap-2">
                            {placements[group.id].map(itemId => {
                                const item = ITEMS.find(i => i.id === itemId);
                                if (!item) return null;
                                
                                let bgClass = "bg-gradient-to-r from-gray-700 to-gray-600";
                                if (checked) {
                                    bgClass = results[itemId] 
                                        ? "bg-gradient-to-r from-green-500 to-green-600" 
                                        : "bg-gradient-to-r from-red-500 to-red-600";
                                }

                                return (
                                    <div 
                                        key={itemId}
                                        className={`px-3 py-2 text-white text-sm rounded-lg font-mono ${bgClass} shadow-sm transition-colors`}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4 gap-4">
                 {!checked ? (
                     <button 
                        onClick={checkAnswers}
                        disabled={items.length === ITEMS.length} // Disable if nothing moved
                        className="px-8 py-3 bg-white border-2 border-gray-800 rounded-xl font-mono font-bold hover:bg-gray-800 hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-800"
                    >
                        Verificar Respuestas
                    </button>
                 ) : (
                    <button 
                        onClick={reset}
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-mono font-bold hover:bg-blue-700 transition-all"
                    >
                        Intentar de Nuevo
                    </button>
                 )}
            </div>
        </div>
    );
};

export default DragDrop;