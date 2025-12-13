import type { DriveImage } from "../types/drive";

/** Google Drive folder ID that contains images for the site (env) */
const FOLDER_ID = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID;
/** Google API key used to fetch drive file list (env) */
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export interface DriveImagesResult {
  banner?: DriveImage;
  gallery: DriveImage[];
}

// Type for Google Drive file response
interface GoogleDriveFile {
  id: string;
  name: string;
  description?: string;
}

interface GoogleDriveResponse {
  files?: GoogleDriveFile[];
}

/**
 * getDriveImages - fetches images from a Drive folder and returns a
 * banner (if a file whose name contains 'banner') and randomized gallery images.
 */
export async function getDriveImages(): Promise<DriveImagesResult> {
  if (!FOLDER_ID || !API_KEY) return { gallery: [] };

  const q = encodeURIComponent(
    `'${FOLDER_ID}' in parents and mimeType contains 'image/'`,
  );
  const fields = encodeURIComponent("files(id,name,description)");
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const data: GoogleDriveResponse = await res.json();

  // Map returned Drive files into our `DriveImage` shape with `url` and `thumb` links.
  const images: DriveImage[] = (data.files ?? []).map((f) => ({
    id: f.id,
    name: f.name,
    description: f.description,
    url: `https://lh3.googleusercontent.com/d/${f.id}=w2000`,
    thumb: `https://lh3.googleusercontent.com/d/${f.id}=s800`,
  }));

  // Pick the banner if any file name contains 'banner' (case-insensitive match).
  const banner = images.find((img) => /banner/i.test(img.name));
  // Shuffle gallery images using Fisher–Yates to get a randomized presentation.
  const gallery = (() => {
    const arr = images.filter((img) => img !== banner);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  })();

  return { banner, gallery };
}
