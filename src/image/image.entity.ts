import { Artist } from "src/artist/artist.entity";
import { Artwork } from "src/artwork/artwork.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  altText: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @ManyToOne(() => Artwork, artwork => artwork.images)
  artwork: Artwork;

  @OneToOne(() => Artist, artist => artist.image)
  artist: Artist;
}