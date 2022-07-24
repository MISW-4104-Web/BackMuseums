import { Artwork } from "../artwork/artwork.entity";
import { Movement } from "../movement/movement.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  image: string;

  @OneToMany(() => Artwork, artwork => artwork.artist)
  artworks: Artwork[];

  @ManyToMany(() => Movement, movement => movement.artists)
  movements: Movement[];
}