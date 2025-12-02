"use client";

import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import styles from "../styles/loveLetter.module.css";

export default function LoveLetterReveal() {
  const [show, setShow] = useState(false);
  const message = `My dearest Avani ❤️,\n\nEvery day with you is a gift.\nHappy Birthday, my love!\nForever yours,\nMehul 💌`;

  useEffect(() => {
    if (!show) return;
    const duration = 3000;
    const end = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };
    const interval = setInterval(() => {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({
        ...defaults,
        particleCount: 50 * (timeLeft / duration),
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#ff6b8a", "#ff9ab0", "#ffc0cb", "#ffe8f3"],
      });
    }, 250);
    return () => clearInterval(interval);
  }, [show]);

  return (
    <div className={styles.container}>
      {!show ? (
        <button
          type="button"
          className={styles.revealBtn}
          onClick={() => setShow(true)}
        >
          Open Your Love Letter 💌
        </button>
      ) : (
        <div className={styles.letter}>
          <Typewriter
            words={[message]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={30}
            deleteSpeed={0}
            delaySpeed={1000}
          />
        </div>
      )}
    </div>
  );
}
