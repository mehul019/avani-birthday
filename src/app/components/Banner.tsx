"use client";

import Image from "next/image";
import styles from "../styles/banner.module.css";

interface BannerProps {
  url: string;
  alt?: string;
}

/**
 * Banner – renders a large, responsive Image used as the page banner.
 * - Accepts an image `url` and optional `alt` text.
 */
export default function Banner({ url, alt = "Banner Image" }: BannerProps) {
  return (
    <div className={styles.bannerWrapper}>
      <Image
        src={url}
        alt={alt}
        width={1200}
        height={400}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          display: "block",
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(255,107,138,0.35)",
        }}
        priority
      />
      <div className={styles.gradientOverlay}></div>
    </div>
  );
}
