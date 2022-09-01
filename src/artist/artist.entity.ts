import { ArtworkEntity } from "src/artwork/artwork.entity";
import { MovementEntity } from "src/movement/movement.entity";
import { ImageEntity } from "src/image/image.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => ImageEntity, image => image.artists)
  image: ImageEntity;

  @OneToMany(() => ArtworkEntity, artwork => artwork.artist)
  artworks: ArtworkEntity[];

  @ManyToMany(() => MovementEntity, movement => movement.artists)
  movements: MovementEntity[];
}