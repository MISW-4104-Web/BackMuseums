import { Artist } from "src/artist/artist.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movement {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
    
    @Column()
    countryOfOrigin: string;
  
    @ManyToMany(() => Artist, artist => artist.movements)
    @JoinTable()
    artists: Artist[];
}