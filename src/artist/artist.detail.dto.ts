import { Artwork } from "src/artwork/artwork.entity";
import { Movement } from "src/movement/movement.entity";
import { ArtistDTO } from "./artist.dto";

export class ArtistDetailDTO extends ArtistDTO {
    readonly artworks: Artwork[];
    readonly movements: Movement[];
}