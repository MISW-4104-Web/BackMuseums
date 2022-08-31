import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

    @Column()
    image: string;

    @OneToMany(() => ExhibitionEntity, exhibition => exhibition.museum)
    exhibitions: ExhibitionEntity[];

    @OneToMany(() => ArtworkEntity, artwork => artwork.museum)
    artworks: ArtworkEntity[];
}
