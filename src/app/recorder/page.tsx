'use client';
import React, { useState, useEffect } from "react";
import { useAudioStore } from "@/store/audio.store";
import { monitorAudioRecords, uploadAudio, deleteAudio } from "@/api/audio.api";

const AudioRecorder: React.FC = () => {
	const { audios, selectAudio, selectedAudio } = useAudioStore();
	const [isRecording, setIsRecording] = useState(false);
	const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

	useEffect(() => {
		monitorAudioRecords();
	}, []);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream);
			const chunks: Blob[] = [];

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					chunks.push(event.data);
				}
			};

			mediaRecorder.onstop = async () => {
				const blob = new Blob(chunks, { type: "audio/webm" });
				await uploadAudio(blob);
			};

			mediaRecorder.start();
			setRecorder(mediaRecorder);
			setIsRecording(true);
		} catch (error) {
			console.error("Error starting recording:", error);
		}
	};

	const stopRecording = () => {
		if (recorder) {
			recorder.stop();
			setIsRecording(false);
			setRecorder(null);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">Audio Recorder</h1>

			{/* Recorder Controls */}
			<div className="my-4">
				{isRecording ? (
					<button
						className="bg-red-500 text-white px-4 py-2 rounded"
						onClick={stopRecording}
					>
						Stop Recording
					</button>
				) : (
					<button
						className="bg-green-500 text-white px-4 py-2 rounded"
						onClick={startRecording}
					>
						Start Recording
					</button>
				)}
			</div>

			{/* Audio List */}
			{audios && (
				<ul className="list-disc pl-5">
					{Object.entries(audios).map(([id, audio]) => (
						<li key={id} className="my-2">
							<audio controls src={audio.url}></audio>
							<p>
								<strong>Uploaded:</strong>{" "}
								{new Date(audio.createdAt).toLocaleString()}
							</p>
							<button
								className="text-red-500"
								onClick={() => deleteAudio(id)}
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}

			{!audios && <p>No audios available.</p>}
		</div>
	);
};

export default AudioRecorder;
