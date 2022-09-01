import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { ArtistEntity } from 'src/artist/artist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ImageEntity, ArtworkEntity, ArtistEntity])],
    controllers: [ImageController],
    providers: [ImageService],
})
export class ImageModule { }
