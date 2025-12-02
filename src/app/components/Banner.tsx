"use client";

import Image from "next/image";
import styles from "../styles/banner.module.css";

interface BannerProps {
  url: string;
  alt?: string;
}

export default function Banner({ url, alt = "Banner Image" }: BannerProps) {
  return (
    <div className={styles.bannerWrapper}>
      <Image
        src={url}
        alt={alt}
        width={1200}
        height={400}
        style={{
          objectFit: "fill",
          borderRadius: "24px",
          boxShadow: "0 8px 20px rgba(255,107,138,0.6)",
          width: "100%",
          height: "auto",
        }}
        priority
      />
      <div className={styles.gradientOverlay}></div>
    </div>
  );
}
