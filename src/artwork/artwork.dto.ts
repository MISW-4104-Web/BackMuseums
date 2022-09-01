import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ArtistDto } from "src/artist/artist.dto";

export class ArtworkDto {
  
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  readonly artist: ArtistDto;
}