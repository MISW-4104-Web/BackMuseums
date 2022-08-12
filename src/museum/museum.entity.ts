import { Artwork } from 'src/artwork/artwork.entity';
import { Exhibition } from 'src/exhibition/exhibition.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Museum {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    address: string;

    @Field()
    @Column()
    city: string;

    @Field()
    @Column()
    image: string;

    @OneToMany(() => Exhibition, exhibition => exhibition.museum)
    exhibitions: Exhibition[];

    @OneToMany(() => Artwork, artwork => artwork.museum)
    artworks: Artwork[];
}
