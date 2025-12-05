"use client";

import styles from "../styles/letter.module.css";

interface LetterProps {
  onClose: () => void;
}

export default function Letter({ onClose }: LetterProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.paper}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          &times;
        </button>
        <div className={styles.paperContent}>
          <pre className={styles.textContent}>
            Dear You, This is a special message just for you. Every word on this
            paper is full of love and warmth. Hope it brings a smile to your
            face! 💖 Yours truly, Mehul
          </pre>
        </div>
      </div>
    </div>
  );
}
