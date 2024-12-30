import { onValue, push, ref, set } from "@firebase/database";
import { database } from "@/lib/firebase";
import { useAudioStore } from "@/store/audio.store";
import toast from "react-hot-toast";

export function monitorAudioRecords() {
    const dbRef = ref(database, "audios");
    console.log("Monitoring audio records");
    onValue(
        dbRef,
        (snapshot) => {
            const data = snapshot.val();
            if (data) {
                useAudioStore.getState().updateAudios(data);
            } else {
                useAudioStore.getState().updateAudios({});
            }
            console.log("Updated audio store", data);
        },
        (error) => {
            console.error(error);
            toast.error("Error monitoring audios");
        }
    );
}

export async function uploadAudio(blob: Blob) {
    try {
        const dbRef = ref(database, "audios");
        const audioUrl = URL.createObjectURL(blob); // Create a temporary URL
        const createdAt = Date.now();

        await push(dbRef, { url: audioUrl, createdAt });
        toast.success("Audio uploaded successfully!");
    } catch (error) {
        console.error("Error uploading audio:", error);
        toast.error("Failed to upload audio.");
    }
}

export async function deleteAudio(id: string) {
    try {
        const dbRef = ref(database, `audios/${id}`);
        await set(dbRef, null);
        toast.success("Audio deleted successfully.");
    } catch (error) {
        console.error("Error deleting audio:", error);
        toast.error("Failed to delete audio.");
    }
}
