"use client";
import React, { useState, useEffect } from "react";
import { useAudioStore } from "@/store/audio.store";
import { monitorAudioRecords, uploadAudio, deleteAudio } from "@/api/audio.api";
import { FaTrashAlt } from "react-icons/fa"; // Import the trash icon
import Recorder from "recorder-js";
import toast from "react-hot-toast";
import WithAuth from "@/components/hoc/withAuth";
import { useUserStore } from "@/store/user.store";
import { UserType } from "@/types/user.type";
import { motion } from "motion/react"

const AudioRecorder: React.FC = () => {
  const { audios, selectAudio, selectedAudio } = useAudioStore();
  const user = useUserStore((state) => state.user) as UserType;
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<Recorder | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    monitorAudioRecords();
  }, []);

  const startRecording = async () => {
    try {
      toast.loading("recording...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new Recorder(new AudioContext());
      setAudioStream(stream);
      await newRecorder.init(stream);

      newRecorder.start().then(() => {
        setRecorder(newRecorder);
        setIsRecording(true);
      });
    } catch (error) {
      toast.error("error while recording");
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (recorder && audioStream) {
      recorder.stop().then(({ blob }) => {
        const file = new File([blob], `${title || "audio"}.mp3`, {
          type: "audio/mp3",
        });
        uploadAudio(file, title, user);
        setTitle("");
      });
      audioStream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setRecorder(null);
    }
    toast.dismiss();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Audio Recorder</h1>

      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-lg font-medium mb-2">
          Recording Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a title for your recording"
        />
      </div>

      {/* Recorder Controls */}
      <div className="my-4 text-center">
        {isRecording ? (
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700"
            onClick={stopRecording}
          >
            Stop Recording
          </button>
        ) : (
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700"
            onClick={startRecording}
            disabled={!title.trim()}
          >
            Start Recording
          </button>
        )}
      </div>

      {/* Audio List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recorded Audios</h2>
        {audios ? (
          <ul className="space-y-4">
            {Object.entries(audios).map(([id, audio]) => (
              <li key={id} className="relative bg-white p-4 rounded shadow">
                {/* User Info */}
                  <img
                    src={audio.user?.photoURL}
                    alt={`${audio.user?.displayName}`}
                    className="w-10 h-10 rounded-full mr-3"

                  />
                  <p className="text-sm font-medium text-gray-700">
                    {audio.user?.displayName}
                  </p>

                {/* Delete Icon */}
                <button
                  className="absolute top-0 right-0 text-white bg-amber-800 hover:bg-amber-900 rounded-full p-1"
                  onClick={() => deleteAudio(id, audio.fileName)}
                >
                  <FaTrashAlt size={10} />
                </button>

                <p className="font-medium text-lg text-teal-950">
                  {audio.title || "Untitled"}
                </p>
                <audio controls src={audio.url} className="w-full mb-2"></audio>
                <p className="text-xs text-gray-500">
                  Uploaded: {new Date(audio.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No audios available.</p>
        )}
      </div>
    </div>
  );
};

export default WithAuth(AudioRecorder);
