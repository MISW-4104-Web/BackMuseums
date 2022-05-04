import { Artist } from "src/artist/artist.entity";
import { Exhibition } from "src/exhibition/exhibition.entity";
import { Museum } from "src/museum/museum.entity";
import { ARTWORK_TYPE } from "src/artworktype/artworktype.enum";

export class ArtworkDTO {
  readonly id: number;
  readonly name: string;
  readonly year: number;
  readonly description: string;
  readonly type: ARTWORK_TYPE;
  readonly mainImage: string;
  readonly museum: Museum;
  readonly exhibition: Exhibition;
  readonly artist: Artist;
}