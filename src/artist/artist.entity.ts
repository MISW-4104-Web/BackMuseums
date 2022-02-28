import { Artwork } from "src/artwork/artwork.entity";
import { Image } from "src/image/image.entity";
import { Movement } from "src/movement/movement.entity";
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthplace: string;

  @Column()
  birthdate: Date;

  @OneToOne(() => Image, image => image.artist)
  image: Image;

  @OneToMany(() => Artwork, artwork => artwork.artist)
  artworks: Artwork[];

  @ManyToMany(() => Movement, movement => movement.artists)
  movements: Movement[];
}