/* eslint-disable prettier/prettier */
import { Exhibition } from "src/exhibition/exhibition.entity";
import { MuseumEntity } from "src/museum/museum.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "src/artist/artist.entity";
import { Image } from "src/image/image.entity";

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column({
    nullable: true
  })
  mainImage: string;

  @ManyToOne(() => MuseumEntity, museum => museum.artworks)
  museum: MuseumEntity;

  @ManyToOne(() => Exhibition, exhibition => exhibition.artworks)
  exhibition: Exhibition;

  @OneToMany(() => Image, image => image.artwork)
  images: Image[];

  @ManyToOne(() => Artist, artist => artist.artworks, {
    onDelete: 'CASCADE'
  })
  artist: Artist;
}