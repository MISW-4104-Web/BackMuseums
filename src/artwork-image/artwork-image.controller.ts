import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { ImageDto } from 'src/image/image.dto';
import { ImageEntity } from 'src/image/image.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { ArtworkDto } from '../artwork/artwork.dto';
import { ArtworkImageService } from './artwork-image.service';

@Controller('artworks')
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtworkImageController {
    constructor(private readonly artworkImageService: ArtworkImageService) { }

    @Get('/:artworkId/images/:imageId')
    async findOne(@Param('artworkId') artworkId: number, @Param('imageId') imageId: number) {
        return await this.artworkImageService.findImageFromArtwork(artworkId, imageId);
    }

    @Get('/:artworkId/images')
    async findAll(@Param('artworkId') artworkId: number) {
        return await this.artworkImageService.findImagesFromArtwork(artworkId);
    }

    @Post('/:artworkId/images/:imageId')
    async create(@Param('artworkId') artworkId: number, @Param('imageId') imageId: number) {
        return await this.artworkImageService.addImageToArtwork(artworkId, imageId);
    }

    @Put('/:artworkId/images')
    async update(@Param('artworkId') artworkId: number, @Body() imagesDto: ImageDto[]) {
        const images : ImageEntity [] = plainToInstance(ImageEntity, imagesDto);
        return await this.artworkImageService.updateImagesFromArtwork(artworkId, images);
    }

    @Delete('/:artworkId/images/:imageId')
    @HttpCode(204)
    async delete(@Param('artworkId') artworkId: number, @Param('imageId') imageId: number) {
        return await this.artworkImageService.deleteImageFromArtwork(artworkId, imageId);
    }
}
