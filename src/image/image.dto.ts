import { Artwork } from "src/artwork/artwork.entity";

export class ImageDTO {
  readonly id: number;
  readonly source: string;
  readonly altText: string;
  readonly height: number;
  readonly width: number;
  readonly artwork: Artwork;
}