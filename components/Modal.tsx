import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center animate-fade-in p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto transform transition-all animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="font-display text-3xl text-gray-800">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 hover:rotate-90 transition-all duration-300 text-xl"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-8 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
