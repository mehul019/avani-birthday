import BirthdayPage from "./components/BirthdayPage";
import { getDriveImages } from "./lib/drive";

/**
 * Page – root page that loads images and renders the birthday layout.
 * Fetches the banner and gallery images from Google Drive and passes them
 * to the client-side `BirthdayPage` component.
 */
export default async function Page() {
  const { banner, gallery } = await getDriveImages();

  return <BirthdayPage banner={banner} gallery={gallery ?? []} />;
}
