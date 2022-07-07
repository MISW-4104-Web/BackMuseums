import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { ImageDTO } from './image.dto';
import { ImageService } from './image.service';

@Controller('artists')
@UseInterceptors(BusinessErrorsInterceptor)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/:artistId/artworks/:artworkId/images/')
  async findAll(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string) {
    return await this.imageService.findAll(artistId, artworkId);
  }

  @Get('/:artistId/artworks/:artworkId/images/:imageId')
  async findOne(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string, @Param('imageId') imageId: string) {
    return await this.imageService.findOne(artistId, artworkId, imageId);
  }

  @Post('/:artistId/artworks/:artworkId/images/')
  @HttpCode(200)
  async create(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string, @Body() imageDTO: ImageDTO) {
    return await this.imageService.create(artistId, artworkId, imageDTO);
  }

  @Put('/:artistId/artworks/:artworkId/images/:imageId')
  async update(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string, @Param('imageId') imageId: string, @Body() imageDTO: ImageDTO) {
    return await this.imageService.update(artistId, artworkId, imageId, imageDTO);
  }

  @Delete('/:artistId/artworks/:artworkId/images/:imageId')
  @HttpCode(204)
  async delete(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string, @Param('imageId') imageId: string) {
    return await this.imageService.delete(artistId, artworkId, imageId);
  }
}
