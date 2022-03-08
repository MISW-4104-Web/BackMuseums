import { Artist } from "src/artist/artist.entity";
import { Exhibition } from "src/exhibition/exhibition.entity";
import { Museum } from "src/museum/museum.entity";
import { TYPE } from "src/type/type.enum";

export class ArtworkDTO {
  readonly id: number;
  readonly name: string;
  readonly year: number;
  readonly description: string;
  readonly type: TYPE;
  readonly museum: Museum;
  readonly exhibition: Exhibition;
  readonly artist: Artist;
}