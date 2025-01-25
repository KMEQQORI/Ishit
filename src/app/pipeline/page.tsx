"use client";
import React, { useState } from "react";
import SwipeableCards from "@/app/pipeline/SwipeableCards";

const PipeLineTasks: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("SwipeableCards");

  return (
    <div className="relative h-screen w-full bg-gray-100">
      {/* Affichage conditionnel des composants */}
      {activeComponent === "SwipeableCards" && <SwipeableCards />}
      {activeComponent === "Form" && (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold">Formulaire à venir</h1>
        </div>
      )}

      {/* Boutons de navigation */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center space-x-4 z-50">
        <button
          className={`${
            activeComponent === "SwipeableCards"
              ? "bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded-full shadow-md`}
          onClick={() => setActiveComponent("SwipeableCards")}
        >
          Swipeable Cards
        </button>
        <button
          className={`${
            activeComponent === "Form"
              ? "bg-green-700"
              : "bg-green-600 hover:bg-green-700"
          } text-white px-4 py-2 rounded-full shadow-md`}
          onClick={() => setActiveComponent("Form")}
        >
          Ajouter une carte
        </button>
      </div>
    </div>
  );
};

export default PipeLineTasks;
