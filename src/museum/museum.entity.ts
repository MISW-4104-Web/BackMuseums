import { Artwork } from 'src/artwork/artwork.entity';
import { Exhibition } from 'src/exhibition/exhibition.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Museum {
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

    @OneToMany(() => Exhibition, exhibition => exhibition.museum)
    exhibitions: Exhibition[];

    @OneToMany(() => Artwork, artwork => artwork.museum)
    artworks: Artwork[];
}
