/** DriveImage – representation of an image pulled from Google Drive */
export interface DriveImage {
  /** Drive file id */
  id: string;
  /** Drive file name */
  name: string;
  /** Optional file description from Drive */
  description?: string;
  /** URL to high-resolution image used for banner or modal */
  url: string;
  /** URL to smaller thumbnail used in gallery views */
  thumb: string;
}
