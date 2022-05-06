import { Exhibition } from "src/exhibition/exhibition.entity";
import { Museum } from "src/museum/museum.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "src/artist/artist.entity";
import { ARTWORK_TYPE } from "src/artworktype/artworktype.enum";
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

  @Column({
    type: "enum",
    enum: ARTWORK_TYPE,
  })
  type: ARTWORK_TYPE;

  @Column({
    nullable: true
  })
  mainImage: string;

  @ManyToOne(() => Museum, museum => museum.artworks)
  museum: Museum;

  @ManyToOne(() => Exhibition, exhibition => exhibition.artworks)
  exhibition: Exhibition;

  @OneToMany(() => Image, image => image.artwork)
  images: Image[];

  @ManyToOne(() => Artist, artist => artist.artworks, {
    onDelete: 'CASCADE'
  })
  artist: Artist;
}