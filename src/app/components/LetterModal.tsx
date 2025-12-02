"use client";

import type { JSX } from "react";
import { useEffect } from "react";
import styles from "../styles/letterModal.module.css";

interface LetterModalProps {
  letters: string[];
  onClose: () => void;
}

export default function LetterModal({
  letters,
  onClose,
}: LetterModalProps): JSX.Element {
  // Close modal on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Love Letters"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClose();
        }
      }}
    >
      {/* Close button */}
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      <div
        className={styles.modalContent}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            onClose();
          }
        }}
      >
        {letters.map((letter) => (
          <button
            key={letter}
            type="button"
            className={styles.letterPreview}
            onClick={() => window.open(letter, "_blank")}
          >
            <object
              data={letter}
              type="application/pdf"
              width="100%"
              height="100%"
            >
              PDF preview not available
            </object>
          </button>
        ))}
      </div>
    </div>
  );
}
