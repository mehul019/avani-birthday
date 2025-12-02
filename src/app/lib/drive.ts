import type { DriveImage } from "../types/drive";

const FOLDER_ID = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

interface GoogleDriveFile {
  id: string;
  name?: string;
  description?: string;
}

interface GoogleDriveResponse {
  files: GoogleDriveFile[];
}

export async function getDriveImages(): Promise<DriveImage[]> {
  if (!FOLDER_ID || !API_KEY) return [];

  const q = encodeURIComponent(
    `'${FOLDER_ID}' in parents and mimeType contains 'image/'`,
  );
  const fields = encodeURIComponent("files(id,name,description)");
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const data: GoogleDriveResponse = await res.json();

  return (data.files ?? []).map((f: GoogleDriveFile) => ({
    id: f.id,
    name: f.name,
    description: f.description,
    url: `https://lh3.googleusercontent.com/d/${f.id}=w2000`,
    thumb: `https://lh3.googleusercontent.com/d/${f.id}=s800`,
  }));
}
