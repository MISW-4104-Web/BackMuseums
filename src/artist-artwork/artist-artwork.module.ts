import { ArtistArtworkController } from './artist-artwork.controller';
import { ArtistArtworkService } from './artist-artwork.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtworkEntity } from '../artwork/artwork.entity';
import { ArtistEntity } from 'src/artist/artist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArtworkEntity, ArtistEntity])],
    controllers: [ArtistArtworkController],
    providers: [ArtistArtworkService],
})
export class ArtistArtworkModule { }