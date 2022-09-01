import { IsNotEmpty, IsString } from "class-validator";

export class MovementDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly countryOfOrigin: string;
}