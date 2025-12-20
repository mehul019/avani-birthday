"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * FloatingHearts
 *
 * Description:
 * - Decorative floating hearts used on the birthday page.
 * - Hearts spawn at random intervals and locations and fade out after a
 *   configured lifetime. There is no audio-driven beat detection in this
 *   component — all spawning is random and independent from background audio.
 * - The placement algorithm tries to avoid overlapping hearts via a small
 *   retry loop and a padding value. If a non-overlapping spot isn't found
 *   after several tries, it falls back to a random placement.
 */

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
  glow: string;
  duration: number;
}

/**
 * getRandomPosition – attempts to find a non-overlapping position for a
 * new heart particle.
 *
 * - `existing`: previously placed hearts used to avoid overlap.
 * - `size`: width/height of the heart particle to consider for overlap checks.
 * - `padding`: extra spacing to avoid visually dense collisions.
 *
 * The function will retry up to 100 times to find a non-overlapping spot.
 * If it fails, it falls back to a random position inside the viewport.
 */
function getRandomPosition(
  existing: { x: number; y: number; size: number }[],
  size: number,
  padding = 40,
) {
  let tries = 0;
  while (tries < 100) {
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);
    const overlap = existing.some(
      (h) =>
        Math.abs(h.x - x) < size + padding &&
        Math.abs(h.y - y) < size + padding,
    );
    if (!overlap) return { x, y };
    tries++;
  }
  return {
    x: Math.random() * (window.innerWidth - size),
    y: Math.random() * (window.innerHeight - size),
  };
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let mounted = true;

    // spawnHearts – the main loop that periodically spawns new hearts.
    // - Ensures we never exceed `maxHearts` in the viewport.
    // - Spawns 1–3 hearts depending on available slots; each heart is scheduled
    //   to be removed after its `duration` to keep the set bounded.
    const spawnHearts = () => {
      if (!mounted) return;

      const maxHearts = 25;
      const availableSlots = maxHearts - hearts.length;
      if (availableSlots <= 0) {
        setTimeout(spawnHearts, 1500 + Math.random() * 1500);
        return;
      }

      const count = Math.min(1 + Math.floor(Math.random() * 3), availableSlots);
      const newHearts: Heart[] = [];

      for (let i = 0; i < count; i++) {
        const size = 20 + Math.random() * 15; // 20-35px
        const duration = 4 + Math.random() * 2; // 4-6s
        const glow = `rgba(255, ${120 + Math.floor(Math.random() * 135)}, ${
          160 + Math.floor(Math.random() * 95)
        }, 0.7)`;

        const { x, y } = getRandomPosition(hearts.concat(newHearts), size);

        const newHeart: Heart = {
          id: uuidv4(),
          x,
          y,
          size,
          emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
          glow,
          duration,
        };

        newHearts.push(newHeart);

        // Schedule a removal for this heart after its `duration` to avoid
        // memory growth. We remove by id so we do not rely on local variables
        // that may be stale in closures.
        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, duration * 1000);
      }

      setHearts((prev) => [...prev, ...newHearts]);

      const nextDelay = 1000 + Math.random() * 2000;
      setTimeout(spawnHearts, nextDelay);
    };

    spawnHearts();

    return () => {
      mounted = false;
    };
  }, [hearts]);

  return (
    <AnimatePresence>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          style={{
            position: "fixed",
            left: h.x,
            top: h.y,
            fontSize: h.size,
            pointerEvents: "none",
            textShadow: `0 0 4px ${h.glow}, 0 0 8px ${h.glow}`,
            opacity: 0.3,
            zIndex: 50,
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: [1, 1.35, 1, 0],
            opacity: [0.25, 0.45, 0.15, 0],
          }}
          transition={{
            duration: h.duration,
            ease: "easeOut",
            times: [0, 0.35, 0.65, 1],
          }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
