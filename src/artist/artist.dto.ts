import { Image } from "src/image/image.entity";

export class ArtistDTO {
  readonly id: number;
  readonly name: string;
  readonly birthplace: string;
  readonly birthdate: Date;
  readonly image: Image;
}