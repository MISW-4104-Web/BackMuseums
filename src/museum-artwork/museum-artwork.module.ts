import { MuseumArtworkService } from './museum-artwork.service';
import { MuseumArtworkController } from './museum-artwork.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from 'src/artwork/artwork.entity';
import { Museum } from 'src/museum/museum.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Museum, Artwork])],
    controllers: [
        MuseumArtworkController,],
    providers: [
        MuseumArtworkService,],
})
export class MuseumArtworkModule { }
