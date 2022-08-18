import { Exhibition } from "src/exhibition/exhibition.entity";
import { Museum } from "src/museum/museum.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "src/artist/artist.entity";
import { ARTWORK_TYPE } from "src/artworktype/artworktype.enum";
import { Image } from "src/image/image.entity";
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Artwork {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    year: number;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column({
      type: "enum",
      enum: ARTWORK_TYPE,
    })
    type: ARTWORK_TYPE;

    @Field()
    @Column({
      nullable: true
    })
    mainImage: string;

    @Field(type => Museum)
    @ManyToOne(() => Museum, museum => museum.artworks)
    museum: Museum;
  
    @ManyToOne(() => Exhibition, exhibition => exhibition.artworks)
    exhibition: Exhibition;
  
    @OneToMany(() => Image, image => image.artwork)
    images: Image[];
  
    @ManyToOne(() => Artist, artist => artist.artworks)
    artist: Artist;
}