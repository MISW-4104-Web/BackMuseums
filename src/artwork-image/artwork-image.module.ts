import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { ImageEntity } from 'src/image/image.entity';
import { ArtworkImageService } from './artwork-image.service';
import { ArtworkImageController } from './artwork-image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ArtworkEntity, ImageEntity])],
  providers: [ArtworkImageService],
  controllers: [ArtworkImageController]
})
export class ArtworkImageModule {}
