"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Masonry from "react-masonry-css";
import styles from "../styles/gallery.module.css";
import type { DriveImage } from "../types/drive";
import Lightbox from "./Lightbox";

interface Props {
  images: DriveImage[];
}

export default function MasonryGallery({ images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const breakpointCols = { default: 3, 1100: 2, 700: 1 };

  return (
    <>
      <Masonry
        breakpointCols={breakpointCols}
        className={styles.masonryGrid}
        columnClassName={styles.masonryColumn}
      >
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            className={styles.imageCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => setOpenIndex(i)}
          >
            <Image
              src={img.thumb}
              alt={img.name ?? "Image"}
              width={500}
              height={600}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "var(--border-radius)",
              }}
            />
          </motion.div>
        ))}
      </Masonry>
      {openIndex !== null && (
        <Lightbox
          images={images}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
