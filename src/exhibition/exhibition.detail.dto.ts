import { Artwork } from "src/artwork/artwork.entity";
import { ExhibitionDTO } from "./exhibition.dto";

export class ExhibitionDetailDTO extends ExhibitionDTO {
    readonly artworks: Artwork[];
}