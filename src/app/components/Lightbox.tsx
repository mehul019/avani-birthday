"use client";

import { FocusTrap } from "focus-trap-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/lightbox.module.css";
import type { DriveImage } from "../types/drive";

interface Props {
  images: DriveImage[];
  startIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);
  const total = images.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((s) => Math.min(s + 1, total - 1));
      if (e.key === "ArrowLeft") setIndex((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, total]);

  const { url, name, description } = images[index];

  return (
    <FocusTrap>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.lightbox}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
          <Image
            src={url}
            alt={name ?? "Image"}
            width={1200}
            height={800}
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              borderRadius: "var(--border-radius)",
            }}
          />
          <div className={styles.info}>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </motion.div>
      </motion.div>
    </FocusTrap>
  );
}
