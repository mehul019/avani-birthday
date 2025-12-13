"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/music.module.css";

/** Simple SVG icon used to denote muted audio state. */
const MutedIcon = ({ title = "Muted" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="#ff4d85"
    role="img"
    aria-labelledby="mutedTitle"
  >
    <title id="mutedTitle">{title}</title>
    <path
      d="M16,6v20c0,1.1-0.772,1.537-1.715,0.971l-6.57-3.942C6.772,22.463,5.1,22,4,22H3c-1.1,0-2-0.9-2-2
      v-8c0-1.1,0.9-2,2-2h1c1.1,0,2.772-0.463,3.715-1.029l6.57-3.942C15.228,4.463,16,4.9,16,6z M26.606,5.394
      c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.047,0,2.828C25.855,10.3,27,13.062,27,16s-1.145,5.7-3.222,7.778
      c-0.781,0.781-0.781,2.047,0,2.828c0.391,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586C29.439,23.773,31,20.007,31,16
      S29.439,8.227,26.606,5.394z M22.363,9.636c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.047,0,2.828C20.479,13.409,21,14.664,21,16
      s-0.52,2.591-1.464,3.535c-0.781,0.781-0.781,2.047,0,2.828c0.391,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586
      C24.064,20.664,25,18.404,25,16S24.063,11.336,22.363,9.636z"
    />
  </svg>
);

/** Simple SVG icon used to denote unmuted audio state. */
const UnmutedIcon = ({ title = "Unmuted" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="#ff4d85"
    role="img"
    aria-labelledby="unmutedTitle"
  >
    <title id="unmutedTitle">{title}</title>
    <path
      d="M16,6v20c0,1.1-0.772,1.537-1.715,0.971l-6.57-3.942C6.772,22.463,5.1,22,4,22H3c-1.1,0-2-0.9-2-2
      v-8c0-1.1,0.9-2,2-2h1c1.1,0,2.772-0.463,3.715-1.029l6.57-3.942C15.228,4.463,16,4.9,16,6z M26.828,16l2.586-2.586
      c0.781-0.781,0.781-2.047,0-2.828s-2.047-0.781-2.828,0L24,13.172l-2.586-2.586c-0.781-0.781-2.047-0.781-2.828,0
      s-0.781,2.047,0,2.828L21.172,16l-2.586,2.586c-0.781,0.781-0.781,2.047,0,2.828C18.977,21.805,19.488,22,20,22
      s1.023-0.195,1.414-0.586L24,18.828l2.586,2.586C26.977,21.805,27.488,22,28,22s1.023-0.195,1.414-0.586
      c0.781-0.781,0.781-2.047,0-2.828L26.828,16z"
    />
  </svg>
);

/** Props for BackgroundMusic component */
interface BackgroundMusicProps {
  /** Whether audio playback should start (triggered by opening the gift) */
  play: boolean;
}

/**
 * BackgroundMusic – client component that manages audio playback and mute state.
 * It handles autoplay attempts, a gentle fade-in volume, and mute/unmute state.
 */
export default function BackgroundMusic({ play }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!play) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.loop = true;

    // Attempt autoplay; this may be blocked by the browser depending on user gesture settings.
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.warn("Autoplay blocked, user interaction may be required");
      });
    }

    // Fade audio in slowly so it doesn't start abruptly when the gift opens.
    let vol = 0;
    const fade = setInterval(() => {
      if (!audio) return clearInterval(fade);
      vol += 0.01;
      audio.volume = Math.min(Math.max(vol, 0), 1);
      if (audio.volume >= 1) clearInterval(fade);
    }, 20);

    return () => clearInterval(fade);
  }, [play]);

  const toggleMute = (): void => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      <button className={styles.muteButton} onClick={toggleMute} type="button">
        {muted ? <MutedIcon /> : <UnmutedIcon />}
      </button>

      <audio ref={audioRef} src="/birthday-music.mp3" loop preload="auto">
        <track kind="captions" src="/blank.vtt" srcLang="en" label="Blank" />
      </audio>
    </>
  );
}
