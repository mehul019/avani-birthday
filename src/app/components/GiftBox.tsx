"use client";

import confetti, { type Options, type Shape } from "canvas-confetti";
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
    const duration = 13000;
    const animationEnd = Date.now() + duration;

    const defaultShapes: Shape[] = ["circle", "square", "star"];

    const defaults: Options = {
      ticks: 120,
      gravity: 0.8,
      spread: 360,
      startVelocity: 40,
      zIndex: 9999,
      scalar: 1.2,
      shapes: defaultShapes,
    };

    const glowColors = [
      "#ff2d75",
      "#ffec00",
      "#00eaff",
      "#7dff00",
      "#ff6bdc",
      "#00ff9f",
      "#ff934f",
      "#6c63ff",
    ];

    const fireBurst = () => {
      confetti({
        ...defaults,
        particleCount: 140 + Math.random() * 120,
        startVelocity: 35 + Math.random() * 30,
        scalar: 1 + Math.random() * 1.2,
        colors: glowColors,
        origin: { x: Math.random(), y: Math.random() },
        angle: Math.random() * 360,
      });
    };

    const bigBurst = () => {
      confetti({
        ...defaults,
        particleCount: 350 + Math.random() * 200,
        startVelocity: 60 + Math.random() * 40,
        scalar: 1.5 + Math.random() * 1.5,
        colors: glowColors,
        origin: { x: Math.random(), y: Math.random() },
        angle: Math.random() * 360,
      });
    };

    const loop = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      if (Math.random() < 0.07) {
        bigBurst();
      } else {
        fireBurst();
      }

      const nextDelay = 80 + Math.random() * 550;
      setTimeout(loop, nextDelay);
    };

    loop();
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
