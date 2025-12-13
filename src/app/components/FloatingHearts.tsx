"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const HEARTS = [
  "❤️",
  "💛",
  "💚",
  "💙",
  "💜",
  "🧡",
  "💖",
  "💝",
  "💞",
  "💕",
  "🩷",
  "🩵",
  "💗",
  "💓",
  "💘",
  "❣️",
  "♥️",
];

interface Heart {
  id: string;
  x: number;
  y: number;
  size: number;
  emoji: string;
  duration: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((hs) => [
        ...hs,
        {
          id: uuidv4(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 20 + Math.random() * 25,
          emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
          duration: 4 + Math.random() * 2,
        },
      ]);
    }, 800);

    const cleanup = setInterval(() => {
      setHearts((hs) => hs.slice(-50));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          style={{
            position: "fixed",
            top: h.y,
            left: h.x,
            fontSize: h.size,
            pointerEvents: "none",
            opacity: 0.5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: h.y - 50 }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </>
  );
}
