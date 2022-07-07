import { ArtworkDTO } from "./artwork.dto";
import { Image } from "src/image/image.entity"

export class ArtworkDetailDTO extends ArtworkDTO {
    readonly images: Image[];
}