import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class SponsorDto {
  
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsUrl()
  readonly website: string;
}