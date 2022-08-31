import { ArtworkEntity } from "src/artwork/artwork.entity";
import { MuseumEntity } from "src/museum/museum.entity";
import { Sponsor } from "src/sponsor/sponsor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExhibitionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => MuseumEntity, museum => museum.exhibitions, {
    onDelete: 'CASCADE'
  })
  museum: MuseumEntity;

  @OneToMany(() => ArtworkEntity, artwork => artwork.exhibition)
  artworks: ArtworkEntity[];

  @OneToOne(() => Sponsor, sponsor => sponsor.exhibition, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  sponsor: Sponsor;
}