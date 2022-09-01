import { IsISO8601, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ImageDto } from "src/image/image.dto";

export class ArtistDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly birthplace: string;

  @IsISO8601()
  @IsNotEmpty()
  readonly birthdate: Date;

  @IsNotEmpty()
  readonly image: ImageDto;
}