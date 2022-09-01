import { ArtistEntity } from "src/artist/artist.entity";
import { ArtworkEntity } from "src/artwork/artwork.entity";
import { MuseumEntity } from "src/museum/museum.entity";

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity()
export class ImageEntity {
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

  @OneToMany(() => MuseumEntity, museum => museum.image)
  museums: MuseumEntity[];

  @ManyToOne(() => ArtworkEntity, artwork => artwork.images, {
    onDelete: 'CASCADE'
  })
  artwork: ArtworkEntity;

  @OneToMany(() => ArtistEntity, artist => artist.image)
  artists: ArtistEntity[];
}