import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtworkEntity } from './artwork.entity';
import { MuseumEntity } from 'src/museum/museum.entity';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { ArtistEntity } from 'src/artist/artist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArtworkEntity, MuseumEntity, ExhibitionEntity, ArtistEntity])],
    controllers: [ArtworkController],
    providers: [ArtworkService],
})
export class ArtworkModule { }
