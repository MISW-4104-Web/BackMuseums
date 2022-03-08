import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { ImageDTO } from './image.dto';
import { ImageService } from './image.service';

@Controller('artworks')
@UseInterceptors(BusinessErrorsInterceptor)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/:artworkId/images/')
  async findAll(@Param('artworkId') artworkId: number) {
    return await this.imageService.findAll(artworkId);
  }

  @Get('/:artworkId/images/:imageId')
  async findOne(@Param('artworkId') artworkId: number, @Param('imageId') imageId: number) {
    return await this.imageService.findOne(artworkId, imageId);
  }

  @Post('/:artworkId/images/')
  @HttpCode(200)
  async create(@Param('artworkId') artworkId: number, @Body() imageDTO: ImageDTO) {
    return await this.imageService.create(artworkId, imageDTO);
  }

  @Put('/:artworkId/images/:imageId')
  async update(@Param('artworkId') artworkId: number, @Param('imageId') imageId: number, @Body() imageDTO: ImageDTO) {
    return await this.imageService.update(artworkId, imageId, imageDTO);
  }

  @Delete('/:artworkId/images/:imageId')
  @HttpCode(204)
  async delete(@Param('artworkId') artworkId: number, @Param('imageId') imageId: number) {
    return await this.imageService.delete(artworkId, imageId);
  }
}
