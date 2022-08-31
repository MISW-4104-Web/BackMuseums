import { ArtistArtworkController } from './artist-artwork.controller';
import { ArtistArtworkService } from './artist-artwork.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from '../artwork/artwork.entity';
import { MuseumEntity } from 'src/museum/museum.entity';
import { Exhibition } from 'src/exhibition/exhibition.entity';
import { Artist } from 'src/artist/artist.entity';
import { Image } from 'src/image/image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Artwork, MuseumEntity, Exhibition, Artist, Image])],
    controllers: [ArtistArtworkController],
    providers: [ArtistArtworkService],
})
export class ArtistArtworkModule { }