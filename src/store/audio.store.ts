import { create } from 'zustand';

// Définir les types pour l'état et les actions
interface AudioRecord {
    id: string; // ID unique de l'enregistrement audio
    url: string; // URL de l'enregistrement
    createdAt: number; // Horodatage
}

interface AudioState {
    selectedAudio: AudioRecord | null;
    audios: Record<string, AudioRecord> | null; // Liste d'audios (par ID)
    updateAudios: (audios: Record<string, AudioRecord>) => void;
    selectAudio: (audio: AudioRecord) => void;
}

// Créer le store avec Zustand
export const useAudioStore = create<AudioState>((set) => ({
    selectedAudio: null,
    audios: null,
    updateAudios: (audios) => set(() => ({ audios })),
    selectAudio: (selectedAudio) => set(() => ({ selectedAudio })),
}));
