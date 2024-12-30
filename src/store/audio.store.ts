import { create } from "zustand";
import { UserType } from "@/types/user.type";

// Définir les types pour l'état et les actions
interface AudioRecord {
  id: string; // ID unique de l'enregistrement audio
  title: string;
  url: string; // URL de l'enregistrement
  createdAt: number; // Horodatage,
  fileName: string;
  user: UserType;
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
