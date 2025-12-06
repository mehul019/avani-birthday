import styles from "../styles/letter.module.css";

interface LetterProps {
  onClose: () => void;
}

export default function Letter({ onClose }: LetterProps) {
  const paragraphs = [
    `My sweet Avani,`,
    `Every time I think of you, my heart fills with happiness. You make my days brighter and my heart lighter. I just wanted to tell you that my love for you grows a little more every day.`,
    `My beloved,
Your smile lights up the quiet corners of my heart. Even in the quietest moments, I feel your presence beside me. With you, life feels complete.`,
    `You bring light into the simplest moments, joy into the quietest days, and comfort into every corner of my world. I always try to capture this love in words. I hope that as you read this, it brings a smile to your face, the same way you effortlessly bring one to mine.`,
    `Every day with you feels like a new adventure. Holding your hand makes my life complete. I cherish every moment, every laugh, and every quiet evening with you.`,
    `With all my love,
Yours always,
Mehul`,
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.paper}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          &times;
        </button>
        <div className={styles.paperContent}>
          <div className={styles.textContent}>
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
