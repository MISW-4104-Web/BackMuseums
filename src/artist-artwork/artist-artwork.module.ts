import { ArtistArtworkController } from './artist-artwork.controller';
import { ArtistArtworkService } from './artist-artwork.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtworkEntity } from '../artwork/artwork.entity';
import { MuseumEntity } from 'src/museum/museum.entity';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { Image } from 'src/image/image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArtworkEntity, MuseumEntity, ExhibitionEntity, ArtistEntity, Image])],
    controllers: [ArtistArtworkController],
    providers: [ArtistArtworkService],
})
export class ArtistArtworkModule { }