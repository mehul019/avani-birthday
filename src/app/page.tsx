import FloatingHearts from "./components/FloatingHearts";
import LoveLetterReveal from "./components/LoveLetterReveal";
import MasonryGallery from "./components/MasonryGallery";
import { getDriveImages } from "./lib/drive";

export default async function Home() {
  const images = await getDriveImages();

  return (
    <main
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FloatingHearts />
      <h1 style={{ fontSize: "3rem", color: "#ff6b8a", marginBottom: "1rem" }}>
        Happy Birthday Avani ❤️
      </h1>
      <LoveLetterReveal />
      <MasonryGallery images={images} />
    </main>
  );
}
