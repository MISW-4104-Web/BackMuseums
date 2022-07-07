import { Exhibition } from "src/exhibition/exhibition.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sponsor {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @Column()
    website: string;
  
    @OneToOne(() => Exhibition, exhibition => exhibition.sponsor)
    exhibition: Exhibition;
}