import { ref as dbRef, onValue, push, set } from "@firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "@firebase/storage";
import { database, storage } from "@/lib/firebase";
import { useAudioStore } from "@/store/audio.store";
import toast from "react-hot-toast";

export function monitorAudioRecords() {
  const dbRefInstance = dbRef(database, "audios");
  console.log("Monitoring audio records");
  onValue(
    dbRefInstance,
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
    },
  );
}

export async function uploadAudio(blob: Blob, title: string) {
  try {
    toast.loading("uploading ...");
    const fileName = `audio-${Date.now()}.webm`;
    const storagePath = storageRef(storage, `audios/${fileName}`);

    // Upload to Firebase Storage
    const uploadResult = await uploadBytes(storagePath, blob);
    const downloadURL = await getDownloadURL(uploadResult.ref);

    // Save metadata to Realtime Database
    const dbRefInstance = dbRef(database, "audios");
    await push(dbRefInstance, {
      url: downloadURL,
      fileName: fileName,
      title: title,
      createdAt: Date.now(),
    });
    toast.dismiss();
    toast.success("Audio uploaded successfully!");
  } catch (error) {
    console.error("Error uploading audio:", error);
    toast.dismiss();
    toast.error("Failed to upload audio.");
  }
}

export async function deleteAudio(id: string, fileName) {
  try {
    // Remove from Firebase Storage
    const filePath = `audios/${fileName}`;
    console.log("filePath", filePath);

    const storagePath = storageRef(storage, filePath);
    await deleteObject(storagePath);

    // Remove from Realtime Database
    const dbRefInstance = dbRef(database, `audios/${id}`);
    await set(dbRefInstance, null);

    toast.success("Audio deleted successfully.");
  } catch (error) {
    console.error("Error deleting audio:", error);
    toast.error("Failed to delete audio.");
  }
}
