import { IsDate, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class ArtistDTO {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly birthplace: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthdate: Date;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}