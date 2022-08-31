import { ExhibitionEntity } from "src/exhibition/exhibition.entity";
import { MuseumEntity } from "src/museum/museum.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArtistEntity } from "src/artist/artist.entity";
import { Image } from "src/image/image.entity";

@Entity()
export class ArtworkEntity {
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

  @ManyToOne(() => MuseumEntity, museum => museum.artworks)
  museum: MuseumEntity;

  @ManyToOne(() => ExhibitionEntity, exhibition => exhibition.artworks)
  exhibition: ExhibitionEntity;

  @OneToMany(() => Image, image => image.artwork)
  images: Image[];

  @ManyToOne(() => ArtistEntity, artist => artist.artworks, {
    onDelete: 'CASCADE'
  })
  artist: ArtistEntity;
}