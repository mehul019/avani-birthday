import Image from "next/image";
import FloatingHearts from "./components/FloatingHearts";
import LoveLetter from "./components/LoveLetter";
import MasonryGallery from "./components/MasonryGallery";
import { getDriveImages } from "./lib/drive";
import styles from "./styles/page.module.css";

export default async function Home() {
  const { banner, gallery } = await getDriveImages();

  return (
    <main className={styles.mainContainer}>
      {/* Banner */}
      {banner && (
        <div className={styles.bannerWrapper}>
          <Image
            src={banner.url}
            alt="Birthday Banner"
            width={1200}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "1rem",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Floating Hearts */}
      <FloatingHearts />

      {/* Love Letter Envelope */}
      <LoveLetter />

      {/* Masonry Gallery */}
      <MasonryGallery images={gallery} />
    </main>
  );
}
