"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/loveLetter.module.css";
import Letter from "./Letter";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        className={styles.loveLetterWrapper}
        animate={{ rotate: [0, 5, -5, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/envelope.png"
          alt="Love Letter"
          width={120}
          height={120}
          className={styles.loveLetterImage}
          draggable={false}
        />
      </motion.button>

      {isOpen && <Letter onClose={() => setIsOpen(false)} />}
    </>
  );
}
