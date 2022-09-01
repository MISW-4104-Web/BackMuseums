import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ImageDto } from "src/image/image.dto";

export class MuseumDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  
  @IsString()
  @IsNotEmpty()
  readonly address: string;
  
  @IsString()
  @IsNotEmpty()
  readonly city: string;
  
  @IsNotEmpty()
  readonly image: ImageDto;
}