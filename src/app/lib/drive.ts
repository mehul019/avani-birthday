import type { DriveImage } from "../types/drive";

const FOLDER_ID = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID;
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

export async function getDriveImages(): Promise<DriveImagesResult> {
  if (!FOLDER_ID || !API_KEY) return { gallery: [] };

  const q = encodeURIComponent(
    `'${FOLDER_ID}' in parents and mimeType contains 'image/'`,
  );
  const fields = encodeURIComponent("files(id,name,description)");
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const data: GoogleDriveResponse = await res.json();

  const images: DriveImage[] = (data.files ?? []).map((f) => ({
    id: f.id,
    name: f.name,
    description: f.description,
    url: `https://lh3.googleusercontent.com/d/${f.id}=w2000`,
    thumb: `https://lh3.googleusercontent.com/d/${f.id}=s800`,
  }));

  const banner = images.find((img) => /banner/i.test(img.name));
  const gallery = images.filter((img) => img !== banner);

  return { banner, gallery };
}
