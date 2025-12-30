import React from 'react';
import { DRUG_DATABASE } from '../constants';

interface MindMapProps {
    onGroupClick: (groupId: string) => void;
}

const MindMap: React.FC<MindMapProps> = ({ onGroupClick }) => {
    return (
        <div className="relative h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 800 500">
                {/* Links */}
                <line x1="400" y1="250" x2="200" y2="150" className="stroke-gray-300 stroke-2 opacity-50" />
                <line x1="400" y1="250" x2="600" y2="150" className="stroke-gray-300 stroke-2 opacity-50" />
                <line x1="400" y1="250" x2="200" y2="350" className="stroke-gray-300 stroke-2 opacity-50" />
                <line x1="400" y1="250" x2="600" y2="350" className="stroke-gray-300 stroke-2 opacity-50" />
                <line x1="400" y1="250" x2="400" y2="100" className="stroke-gray-300 stroke-2 opacity-50" />

                {/* Central Node */}
                <g className="cursor-pointer transition-transform hover:scale-110 duration-300">
                    <circle cx="400" cy="250" r="60" stroke="#2D3748" strokeWidth="3" fill="white" className="filter drop-shadow-lg" />
                    <text x="400" y="240" textAnchor="middle" dominantBaseline="middle" className="text-2xl pointer-events-none">⚛️</text>
                    <text x="400" y="265" textAnchor="middle" dominantBaseline="middle" className="font-mono text-xs font-bold pointer-events-none">ANTINEOPLÁSICOS</text>
                </g>

                {/* Group Nodes */}
                {Object.values(DRUG_DATABASE).map((group) => {
                    let cx = 0, cy = 0;
                    if (group.id === 'antimetabolitos') { cx = 200; cy = 150; }
                    else if (group.id === 'adn-arn') { cx = 600; cy = 150; }
                    else if (group.id === 'antimitoticos') { cx = 200; cy = 350; }
                    else if (group.id === 'hormonales') { cx = 600; cy = 350; }
                    else if (group.id === 'inmuno') { cx = 400; cy = 100; }

                    return (
                        <g 
                            key={group.id} 
                            onClick={() => onGroupClick(group.id)}
                            className="cursor-pointer transition-transform hover:scale-110 duration-300"
                        >
                            <circle cx={cx} cy={cy} r="50" stroke={group.color} strokeWidth="3" fill="white" className="filter drop-shadow-md" />
                            <text x={cx} y={cy - 5} textAnchor="middle" dominantBaseline="middle" className="text-2xl pointer-events-none">{group.icon}</text>
                            <text x={cx} y={cy + 15} textAnchor="middle" dominantBaseline="middle" className="font-mono text-[10px] font-bold pointer-events-none fill-gray-800">
                                {group.title.split(' ')[0]}
                            </text>
                        </g>
                    );
                })}
            </svg>
            <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-gray-500 text-sm pointer-events-none">
                💡 Haz clic en cada grupo para explorar los fármacos
            </div>
        </div>
    );
};

export default MindMap;
