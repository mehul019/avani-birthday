import Banner from "./components/Banner";
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
      {banner && <Banner url={banner.url} alt="Birthday Banner" />}

      {/* Floating Hearts */}
      <FloatingHearts />

      {/* Love Letter */}
      <LoveLetter />

      {/* Masonry Gallery */}
      <MasonryGallery images={gallery ?? []} />
    </main>
  );
}
