/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from './artwork.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Artwork])],
    controllers: [],
    providers: [],
})
export class ArtworkModule { }
