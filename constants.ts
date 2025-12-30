import { DrugDatabase, Flashcard } from './types';

export const DRUG_DATABASE: DrugDatabase = {
    antimetabolitos: {
        id: 'antimetabolitos',
        title: "Antimetabolitos",
        color: "#0047AB",
        icon: "🧬",
        drugs: [
            { name: "Metotrexate (MTX)", mechanism: "Análogo del Ácido Fólico." },
            { name: "5-Fluoruracilo / Citarabina", mechanism: "Análogos de bases pirimidínicas." },
            { name: "Fludarabina", mechanism: "Análogo de bases púricas." }
        ],
        mechanism: "Sustancias que inhiben un metabolito esencial, actuando como falsos sustratos en la síntesis de ADN."
    },
    "adn-arn": {
        id: 'adn-arn',
        title: "ADN/ARN y Síntesis Proteica",
        color: "#50C878",
        icon: "💊",
        drugs: [
            { name: "Ifosfamida / Ciclofosfamida", mechanism: "Alquilantes. EA: Cistitis hemorrágica (Antídoto: MESNA)." },
            { name: "Carmustina", mechanism: "Alquilante muy lipófilo (Útil en tumores cerebrales)." },
            { name: "Tiotepa / Dacarbazina", mechanism: "Agentes Alquilantes." },
            { name: "Cisplatino / Carboplatino", mechanism: "Platinos. EA: Nefrotoxicidad (Hidratación + Manitol)." },
            { name: "Doxorrubicina / Epirrubicina", mechanism: "Antibióticos. EA: Cardiotoxicidad (-icina)." },
            { name: "Bleomicina / Mitomicina C / Actinomicina", mechanism: "Antibióticos antitumorales." },
            { name: "Topotecán / Etopósido / Tenipósido", mechanism: "Inhibidores de Topoisomerasas (ADN girasa)." },
            { name: "L-Asparraginasa", mechanism: "Enzima." }
        ],
        mechanism: "Fármacos que dañan directamente el ADN (Alquilantes, Platinos, Antibióticos) o inhiben enzimas de replicación."
    },
    antimitoticos: {
        id: 'antimitoticos',
        title: "Antimitóticos",
        color: "#8B5CF6",
        icon: "🌿",
        drugs: [
            { name: "Vincristina / Vinblastina / Vindesina", mechanism: "Alcaloides de la Vinca. Se fijan a la tubulina." },
            { name: "Paclitaxel", mechanism: "Taxano. Se fija a la tubulina." }
        ],
        mechanism: "Acción citotóxica por inhibición de la mitosis celular (Fase M), afectando a los microtúbulos."
    },
    hormonales: {
        id: 'hormonales',
        title: "Hormonales",
        color: "#FF7F50",
        icon: "💉",
        drugs: [
            { name: "Tamoxifeno", mechanism: "Antiestrógeno (Cáncer de mama)." },
            { name: "Aminoglutetimida", mechanism: "Inhibidor de la Aromatasa." },
            { name: "Leuprolide", mechanism: "Análogo de LH-RH o GnRH." },
            { name: "Flutamida", mechanism: "Antiandrógeno (Cáncer de próstata)." },
            { name: "Prednisona / Dexametasona", mechanism: "Glucocorticoides." }
        ],
        mechanism: "Modulan el entorno hormonal para frenar tumores dependientes de hormonas (mama, próstata, etc.)."
    },
    inmuno: {
        id: 'inmuno',
        title: "Inmuno y Nuevos Fármacos",
        color: "#40E0D0",
        icon: "🔬",
        drugs: [
            { name: "Alemtuzumab / Cetuximab", mechanism: "Anticuerpos Monoclonales (-mab)." },
            { name: "Vacuna BCG", mechanism: "Inmunoterapia local. Uso: Cáncer vesical (Vía transuretral)." },
            { name: "Aldesleukina", mechanism: "Interleucina." },
            { name: "Interferones (Alfa/Beta)", mechanism: "Inmunomoduladores." },
            { name: "Bortezomib", mechanism: "Nuevo fármaco (-mib)." },
            { name: "Imatinib / Erlotinib / Gefitinib", mechanism: "Inhibidores de tirosina cinasa (-nib)." }
        ],
        mechanism: "Terapias biológicas que estimulan el sistema inmune o atacan dianas moleculares específicas."
    }
};

export const FLASHCARDS: Flashcard[] = [
    { id: 1, question: "IFOSFAMIDA / CICLOFOSFAMIDA", answer: "GRUPO: Agentes Alquilantes\nTOXICIDAD: Cistitis Hemorrágica\nANTÍDOTO: MESNA" },
    { id: 2, question: "CARMUSTINA", answer: "GRUPO: Agentes Alquilantes\nCARACTERÍSTICA: Muy lipófilo\nUSO: Tumores cerebrales y linfomas" },
    { id: 3, question: "CISPLATINO / CARBOPLATINO", answer: "GRUPO: Platinos\nMECANISMO: Cross-linking ADN\nTOXICIDAD: Nefrotóxico (Requiere hidratación + Manitol)" },
    { id: 4, question: "DOXORRUBICINA / EPIRRUBICINA", answer: "GRUPO: Antibióticos Antitumorales\nSUFIJO: -icina\nTOXICIDAD ESPECÍFICA: Cardiotoxicidad" },
    { id: 5, question: "VINCRISTINA / VINBLASTINA", answer: "GRUPO: Antimitóticos (Alcaloides Vinca)\nDIANA: Se fijan a la tubulina\nEFECTO: Inhiben la mitosis (Fase M)" },
    { id: 6, question: "TAMOXIFENO", answer: "GRUPO: Hormonales\nMECANISMO: Antiestrógeno\nINDICACIÓN: Cáncer de mama" },
    { id: 7, question: "FLUTAMIDA", answer: "GRUPO: Hormonales\nMECANISMO: Antiandrógeno\nINDICACIÓN: Cáncer de próstata" },
    { id: 8, question: "VACUNA BCG", answer: "GRUPO: Inmunoterápicos\nUSO: Cáncer vesical (Vejiga)\nVÍA: Transuretral" },
    { id: 9, question: "SUFIJO '-MAB' (Ej: Alemtuzumab)", answer: "TIPO: Anticuerpos Monoclonales\nGRUPO: Inmunoterapia" },
    { id: 10, question: "SUFIJO '-NIB' (Ej: Imatinib)", answer: "TIPO: Inhibidores de Tirosina Cinasa\nGRUPO: Nuevos Fármacos Antineoplásicos" }
];