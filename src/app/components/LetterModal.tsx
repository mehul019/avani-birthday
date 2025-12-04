"use client";

import { useState } from "react";
import styles from "../styles/letterModal.module.css";

interface LetterModalProps {
  onClose: () => void;
  letters: string[];
}

export default function LetterModal({ onClose, letters }: LetterModalProps) {
  const [activePdf, setActivePdf] = useState<string | null>(null);

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Love Letters"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className={styles.modalContent}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>

        <div className={styles.letterGrid}>
          {letters.map((pdf) => (
            <div
              key={pdf}
              className={styles.letterCard}
              role="dialog"
              onClick={() => setActivePdf(pdf)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePdf(pdf);
                }
              }}
            >
              {/* PDF preview using <iframe> */}
              <iframe src={pdf} title={pdf} className={styles.pdfPreview} />
            </div>
          ))}
        </div>

        {activePdf && (
          <div className={styles.pdfModal}>
            <button
              className={styles.closeButton}
              onClick={() => setActivePdf(null)}
              aria-label="Close PDF"
              type="button"
            >
              ×
            </button>
            <iframe
              title={activePdf}
              src={activePdf}
              className={styles.fullPdf}
            />
          </div>
        )}
      </div>
    </div>
  );
}
