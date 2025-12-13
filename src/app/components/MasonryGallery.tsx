"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import styles from "../styles/gallery.module.css";
import type { DriveImage } from "../types/drive";

interface Props {
  images: DriveImage[];
}

/**
 * MasonryGallery – displays images in a responsive masonry layout.
 * Supports 'auto mode' to highlight random images and scroll between them.
 */
export default function MasonryGallery({ images }: Props) {
  const [shuffled, setShuffled] = useState<DriveImage[]>(images);
  const [autoMode, setAutoMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const autoInterval = useRef<NodeJS.Timeout | null>(null);
  const shuffleInterval = useRef<NodeJS.Timeout | null>(null);

  // Shuffle every 5 minutes (only when auto mode is OFF)
  useEffect(() => {
    if (!autoMode) {
      shuffleInterval.current = setInterval(() => {
        setShuffled((prev) => [...prev].sort(() => Math.random() - 0.5));
      }, 300000);
    }
    return () => {
      if (shuffleInterval.current) clearInterval(shuffleInterval.current);
    };
  }, [autoMode]);

  // Auto mode effect – picks and highlights a random image every 5s
  useEffect(() => {
    if (autoMode) {
      if (shuffleInterval.current) clearInterval(shuffleInterval.current);

      // Choose a random image to focus and scroll into view
      const pickNext = () => {
        const nextIndex = Math.floor(Math.random() * shuffled.length);
        setActiveIndex(nextIndex);

        const imgElement = document.getElementById(
          `img-${shuffled[nextIndex].id}`,
        );
        imgElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      };

      pickNext();
      autoInterval.current = setInterval(() => {
        pickNext();
      }, 5000);
    } else {
      setActiveIndex(null);
      if (autoInterval.current) clearInterval(autoInterval.current);

      // Scroll to top after layout stabilizes when auto mode is turned off
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);

      return () => clearTimeout(timer);
    }

    return () => {
      if (autoInterval.current) clearInterval(autoInterval.current);
    };
  }, [autoMode, shuffled]);

  const breakpointCols = {
    default: 6,
    1300: 5,
    1000: 4,
    700: 3,
    500: 2,
    400: 1,
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Toggle Button */}
      <button
        onClick={() => setAutoMode(!autoMode)}
        className={`${styles.loveFlowButton} ${
          autoMode ? styles.loveFlowOn : styles.loveFlowOff
        }`}
        type="button"
      >
        {autoMode ? "Stop Love Flow" : "Love Flow ✦⋆.˚"}
      </button>

      <Masonry
        breakpointCols={breakpointCols}
        className={styles.masonryGrid}
        columnClassName={styles.masonryColumn}
      >
        {shuffled.map((img, index) => (
          <AnimatePresence key={img.id}>
            <motion.div
              id={`img-${img.id}`}
              className={`${styles.imageCard} ${autoMode ? styles.gray : ""} ${
                activeIndex === index ? styles.activeGlow : ""
              }`}
              key={img.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeIndex === index || !autoMode ? 1 : 0.4,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              // Only enable hover when autoMode is OFF
              {...(!autoMode
                ? {
                    whileHover: {
                      scale: [1, 1.06, 1],
                      transition: { duration: 0.8, repeat: Infinity },
                    },
                  }
                : {})}
            >
              <Image
                src={img.thumb}
                alt={img.name ?? "Gallery Image"}
                width={200}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block",
                }}
              />
            </motion.div>
          </AnimatePresence>
        ))}
      </Masonry>
    </div>
  );
}
