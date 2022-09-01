import { IsNotEmpty, IsString } from "class-validator";
import { SponsorDto } from "src/sponsor/sponsor.dto";

export class ExhibitionDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()  
  readonly sponsor: SponsorDto;
}