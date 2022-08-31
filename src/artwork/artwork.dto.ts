import { ArtistDto } from "src/artist/artist.dto";

export class ArtworkDto {
  readonly id: number;
  readonly name: string;
  readonly year: number;
  readonly description: string;
  readonly type: string;
  readonly artist: ArtistDto;
}