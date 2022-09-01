import { ExhibitionEntity } from "src/exhibition/exhibition.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SponsorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  website: string;

  @OneToOne(() => ExhibitionEntity, exhibition => exhibition.sponsor)
  exhibition: ExhibitionEntity;
}