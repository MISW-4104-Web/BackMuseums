import { Exhibition } from "src/exhibition/exhibition.entity";

export class SponsorDTO {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly website: string;
  readonly exhibition: Exhibition;
}