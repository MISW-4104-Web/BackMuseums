import { IsISO8601, IsNotEmpty, IsString, IsUrl } from "class-validator";

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

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}