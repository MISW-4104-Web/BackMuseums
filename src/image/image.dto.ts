import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ImageDto {

  @IsString()
  @IsNotEmpty()
  readonly source: string;

  @IsString()
  @IsNotEmpty()
  readonly altText: string;

  @IsNumber()
  @IsNotEmpty()
  readonly height: number;

  @IsNumber()
  @IsNotEmpty()
  readonly width: number;
}