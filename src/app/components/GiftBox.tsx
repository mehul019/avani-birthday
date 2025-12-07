"use client";

import confetti from "canvas-confetti";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/giftBox.module.css";

interface GiftBoxProps {
  onOpened: () => void;
}

export default function GiftBox({ onOpened }: GiftBoxProps) {
  const [isClicked, setIsClicked] = useState(false);

  const startConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      ticks: 60,
      zIndex: 9999,
      gravity: 0.3,
      startVelocity: 30,
      decay: 0.9,
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const originsWithAngles = [
        { origin: { x: 0.05, y: 0.05 }, angle: 315 },
        { origin: { x: 0.95, y: 0.05 }, angle: 225 },
        { origin: { x: 0.05, y: 0.95 }, angle: 45 },
        { origin: { x: 0.95, y: 0.95 }, angle: 135 },
        { origin: { x: 0.5, y: 0.5 }, angle: 90 },
      ];

      originsWithAngles.forEach(({ origin, angle }, index) => {
        confetti({
          ...defaults,
          particleCount: index === 4 ? 80 : 50,
          origin,
          angle,
          spread: index === 4 ? 150 : 40,
          colors: [
            "#FF6B8A",
            "#FFD700",
            "#FF4500",
            "#00BFFF",
            "#ADFF2F",
            "#FF69B4",
          ],
        });
      });
    }, 150);
  };

  const variants: Variants = {
    initial: { scale: 1, rotate: 0, x: 0, y: 0 },
    anim: {
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 5, -5, 0],
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 3,
        ease: "easeInOut",
      },
    },
    clicked: {
      scale: 3,
      opacity: 0,
      transition: { duration: 2.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className={styles.giftContainer}
      variants={variants}
      initial="initial"
      animate={isClicked ? "clicked" : "anim"}
      onAnimationComplete={() => {
        if (isClicked) {
          startConfetti();
          onOpened();
        }
      }}
    >
      <div className={styles.centerWrapper}>
        <Image
          src="/cute-gift-box.png"
          alt="Gift Box"
          width={500}
          height={500}
          priority
          className={styles.giftBoxImage}
          draggable={false}
          onClick={() => setIsClicked(true)}
        />
      </div>
    </motion.div>
  );
}
