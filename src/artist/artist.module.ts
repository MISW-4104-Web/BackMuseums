import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { ImageEntity } from 'src/image/image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArtistEntity, ImageEntity])],
    controllers: [ArtistController],
    providers: [ArtistService],
})
export class ArtistModule { }
