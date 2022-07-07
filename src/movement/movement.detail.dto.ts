import { MovementDTO } from './movement.dto'
import { Artist } from 'src/artist/artist.entity'

export class MovementDetailDTO extends MovementDTO {
    readonly artists: Artist[];
}