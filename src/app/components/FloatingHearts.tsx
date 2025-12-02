"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Heart {
  id: string;
  x: number;
  duration: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Initialize hearts only on the client
    const newHearts: Heart[] = Array.from({ length: 10 }).map(() => ({
      id: uuidv4(),
      x: Math.random() * window.innerWidth,
      duration: 4 + Math.random() * 2,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-4xl"
          style={{ left: heart.x, color: "#ff6b8a" }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: -200, opacity: 1 }}
          transition={{ duration: heart.duration, repeat: Infinity }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
