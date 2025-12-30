export interface Drug {
    name: string;
    mechanism: string;
}

export interface DrugGroup {
    id: string;
    title: string;
    color: string;
    icon: string;
    drugs: Drug[];
    mechanism: string;
}

export interface DrugDatabase {
    [key: string]: DrugGroup;
}

export interface Flashcard {
    id: number;
    question: string;
    answer: string;
}

export interface AppState {
    currentCardIndex: number;
    correctAnswers: number;
    totalAnswers: number;
    studiedDrugs: Set<string>;
    startTime: number;
    progress: number;
}

export type Tab = 'mindmap' | 'groups' | 'flashcards' | 'dragdrop' | 'stories' | 'stats';
