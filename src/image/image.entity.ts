import { Artwork } from "src/artwork/artwork.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
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
}