import React from 'react';
import { DRUG_DATABASE } from '../constants';

interface GroupsProps {
    onGroupClick: (groupId: string) => void;
}

const Groups: React.FC<GroupsProps> = ({ onGroupClick }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {Object.values(DRUG_DATABASE).map((group) => (
                <div 
                    key={group.id}
                    onClick={() => onGroupClick(group.id)}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                >
                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                        <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl text-white shadow-sm"
                            style={{ backgroundColor: group.color }}
                        >
                            {group.icon}
                        </div>
                        <div className="font-display text-2xl tracking-wide">{group.title}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                        {group.drugs.map((drug, idx) => (
                            <span 
                                key={idx}
                                className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono hover:bg-gray-200 transition-colors"
                            >
                                {drug.name}
                            </span>
                        ))}
                    </div>
                    
                    <div className="mt-5 pt-5 border-t-2 border-dashed border-gray-100 text-sm text-gray-500 leading-relaxed relative z-10">
                        <strong className="text-gray-700">Mecanismo:</strong> {group.mechanism}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Groups;
