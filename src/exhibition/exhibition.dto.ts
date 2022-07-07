import { Museum } from "src/museum/museum.entity";
import { Sponsor } from "src/sponsor/sponsor.entity";

export class ExhibitionDTO {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly sponsor: Sponsor;
  readonly museum: Museum;
}