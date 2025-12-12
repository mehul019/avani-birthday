"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import styles from "../styles/gallery.module.css";
import type { DriveImage } from "../types/drive";

interface Props {
  images: DriveImage[];
}

export default function MasonryGallery({ images }: Props) {
  const [shuffled, setShuffled] = useState<DriveImage[]>(images);

  // Shuffle every 5 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffled((prev) => [...prev].sort(() => Math.random() - 0.5));
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const breakpointCols = {
    default: 6,
    1300: 5,
    1000: 4,
    700: 3,
    500: 2,
    400: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className={styles.masonryGrid}
      columnClassName={styles.masonryColumn}
    >
      {shuffled.map((img) => (
        <motion.div
          key={img.id}
          className={styles.imageCard}
          whileHover={{
            scale: [1, 1.06, 1],
            transition: { duration: 0.8, repeat: Infinity },
          }}
          animate={{ scale: 1 }}
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
      ))}
    </Masonry>
  );
}
