"use client";

import { useState } from "react";
import styles from "../styles/birthdayPage.module.css";
import type { DriveImage } from "../types/drive";
import BackgroundMusic from "./BackgroundMusic";
import Banner from "./Banner";
import FloatingHearts from "./FloatingHearts";
import GiftBox from "./GiftBox";
import LoveLetter from "./LoveLetter";
import MasonryGallery from "./MasonryGallery";

interface BirthdayPageProps {
  banner: DriveImage | undefined;
  gallery: DriveImage[];
}

/**
 * BirthdayPage – orchestrates the main interactive pieces of the app.
 * Shows a `GiftBox` first; when opened, reveals music, banner, love letter and gallery.
 */
export default function BirthdayPage({ banner, gallery }: BirthdayPageProps) {
  const [giftOpened, setGiftOpened] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleGiftOpened = (): void => {
    setGiftOpened(true);
    // Use a brief delay to start audio after the gift open animation finishes.
    setTimeout(() => setMusicStarted(true), 100);
  };

  return (
    <main className={styles.mainContainer}>
      {!giftOpened && <GiftBox onOpened={handleGiftOpened} />}

      {giftOpened && (
        <>
          {musicStarted && <BackgroundMusic play={musicStarted} />}
          {banner && <Banner url={banner.url} alt="Birthday Banner" />}
          <MasonryGallery images={gallery} />
          <LoveLetter />
          <FloatingHearts />
        </>
      )}
    </main>
  );
}
