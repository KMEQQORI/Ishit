import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  { id: 1, text: "Ceci est la première carte." },
  { id: 2, text: "Voici une autre carte." },
  { id: 3, text: "C'est une troisième carte avec du texte." },
  { id: 4, text: "Encore une carte pour tester le swipe !" },
];

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
];

const SwipeableCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("up");

  const handleSwipe = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === "up" && currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (newDirection === "down" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getRandomColor = (index) => colors[index % colors.length];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <div className="fixed bottom-4 left-4 z-50 bg-black bg-opacity-50 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md">
        {currentIndex + 1} / {cards.length}
      </div>

      <AnimatePresence initial={false} mode="wait">
        {cards.map(
          (card, index) =>
            index === currentIndex && (
              <motion.div
                key={card.id}
                className={`absolute inset-0 flex items-center justify-center ${getRandomColor(index)} rounded-2xl shadow-lg p-6`}
                initial={{ y: direction === "up" ? "100%" : "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: direction === "up" ? "-100%" : "100%" }}
                transition={{ duration: 0.5 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.y < -100) handleSwipe("up");
                  else if (info.offset.y > 100) handleSwipe("down");
                }}
              >
                <h1 className="text-white text-2xl font-bold text-center">
                  {card.text}
                </h1>
              </motion.div>
            ),
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeableCards;
