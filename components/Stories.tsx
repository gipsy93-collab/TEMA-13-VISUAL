import React from 'react';

const Stories: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fade-in">
             <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <h2 className="font-display text-4xl text-antimitoticos mb-6 text-center">🌿 Las Hermanas Vinca</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: "👸👸👸", text: "Tres hermanas viven en los microtúbulos: Vin-Cristina, Vin-Blastina y Vin-Desina" },
                        { icon: "🚖", text: "El Taxi Paclitaxel llega y las congela, impidiendo que se muevan" },
                        { icon: "❌", text: "Sin movimiento no hay división: La célula cancerosa muere" }
                    ].map((frame, i) => (
                        <div key={i} className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl p-6 text-white text-center flex flex-col items-center justify-center min-h-[200px] shadow-md animate-success-bounce" style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'backwards' }}>
                            <div className="text-5xl mb-4">{frame.icon}</div>
                            <div className="font-main leading-relaxed">{frame.text}</div>
                        </div>
                    ))}
                </div>
             </div>

             <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <h2 className="font-display text-4xl text-antimetabolitos mb-6 text-center">💎 Los Platinos Guerreros</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: "⚔️", text: "Cisplatino y Carboplatino son guerreros del ADN" },
                        { icon: "🔗", text: "Crean puentes entre las hebras (cross-linking)" },
                        { icon: "💧", text: "¡Cuidado con los riñones! Necesitan agua para protegerlos" }
                    ].map((frame, i) => (
                        <div key={i} className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white text-center flex flex-col items-center justify-center min-h-[200px] shadow-md animate-success-bounce" style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'backwards' }}>
                            <div className="text-5xl mb-4">{frame.icon}</div>
                            <div className="font-main leading-relaxed">{frame.text}</div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

export default Stories;
