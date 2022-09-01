import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { ImageDto } from './image.dto';
import { ImageEntity } from './image.entity';
import { ImageService } from './image.service';

@Controller('images') 
@UseInterceptors(BusinessErrorsInterceptor)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async findAll() {
    return await this.imageService.findAll();
  }

  @Get('/:imageId')
  async findOne(@Param('imageId') imageId: number) {
    return await this.imageService.findOne(imageId);
  }

  @Post()
  async create(@Body() imageDTO: ImageDto) {
    const image: ImageEntity = plainToInstance(ImageEntity, imageDTO);
    return await this.imageService.create(image);
  }

  @Put('/:imageId')
  async update(@Param('imageId') imageId: number, @Body() imageDTO: ImageDto) {
    const image: ImageEntity = plainToInstance(ImageEntity, imageDTO);
    return await this.imageService.update(imageId, image);
  }

  @Delete('/:imageId')
  @HttpCode(204)
  async delete(@Param('imageId') imageId: number) {
    return await this.imageService.delete(imageId);
  }
}
