import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Artwork } from 'src/artwork/artwork.entity';
import { Artist } from 'src/artist/artist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Image, Artwork, Artist])],
    controllers: [ImageController],
    providers: [ImageService],
})
export class ImageModule { }
