import { Artwork } from "src/artwork/artwork.entity";
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

  @Column()
  image: string;

  @OneToMany(() => Artwork, artwork => artwork.artist)
  artworks: Artwork[];

  @ManyToMany(() => Movement, movement => movement.artists)
  movements: Movement[];
}