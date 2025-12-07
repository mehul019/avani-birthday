import BirthdayPage from "./components/BirthdayPage";
import { getDriveImages } from "./lib/drive";

export default async function Page() {
  const { banner, gallery } = await getDriveImages();

  return <BirthdayPage banner={banner} gallery={gallery ?? []} />;
}
