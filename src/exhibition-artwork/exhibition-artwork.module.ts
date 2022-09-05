import { ExhibitionArtworkService } from './exhibition-artwork.service';
import { ExhibitionArtworkController } from './exhibition-artwork.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { MuseumEntity } from 'src/museum/museum.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MuseumEntity, ExhibitionEntity, ArtworkEntity])],
    controllers: [ExhibitionArtworkController], 
    providers: [ExhibitionArtworkService],
})
export class ExhibitionArtworkModule { } 
