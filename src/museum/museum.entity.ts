import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { ImageEntity } from 'src/image/image.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class MuseumEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @ManyToOne(() => ImageEntity, image => image.museums)
    image: ImageEntity

    @OneToMany(() => ExhibitionEntity, exhibition => exhibition.museum)
    exhibitions: ExhibitionEntity[];

    @OneToMany(() => ArtworkEntity, artwork => artwork.museum)
    artworks: ArtworkEntity[];
}
