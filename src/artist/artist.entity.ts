import { ArtworkEntity } from "src/artwork/artwork.entity";
import { Movement } from "src/movement/movement.entity";
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArtistEntity {
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

  @OneToMany(() => ArtworkEntity, artwork => artwork.artist)
  artworks: ArtworkEntity[];

  @ManyToMany(() => Movement, movement => movement.artists)
  movements: Movement[];
}