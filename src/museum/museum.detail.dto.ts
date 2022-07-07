import { MuseumDTO } from './museum.dto';
import { Exhibition } from 'src/exhibition/exhibition.entity';
import { Artwork } from 'src/artwork/artwork.entity';

export class MuseumDetailDTO extends MuseumDTO{
    readonly exhibitions: Exhibition[];
    readonly artworks: Artwork[];
}
