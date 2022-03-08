import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from './artwork.entity';
import { Museum } from 'src/museum/museum.entity';
import { Exhibition } from 'src/exhibition/exhibition.entity';
import { Artist } from 'src/artist/artist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Artwork, Museum, Exhibition, Artist])],
    controllers: [ArtworkController],
    providers: [ArtworkService],
})
export class ArtworkModule { }
