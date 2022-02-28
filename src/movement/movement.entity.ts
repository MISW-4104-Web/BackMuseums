import { Artist } from "src/artist/artist.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
  
  @Column()
  countryOfOrigin: string;

  @Column()
  activeYears: string;

  @ManyToMany(() => Artist, artist => artist.movements)
  @JoinTable()
  artists: Artist[];
}