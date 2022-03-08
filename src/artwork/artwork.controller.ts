import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { ArtworkDTO } from './artwork.dto';
import { ArtworkService } from './artwork.service';

@Controller('artworks')
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @Get()
  async findAll() {
    return await this.artworkService.findAll();
  }

  @Get(':artworkId')
  async findOne(@Param('artworkId') artworkId: number) {
    return await this.artworkService.findOne(artworkId);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() artworkDTO: ArtworkDTO) {
    return await this.artworkService.create(artworkDTO);
  }

  @Put(':artworkId')
  async update(@Param('artworkId') artworkId: number, @Body() artworkDTO: ArtworkDTO) {
    return await this.artworkService.update(artworkId, artworkDTO);
  }

  @Delete(':artworkId')
  @HttpCode(204)
  async delete(@Param('artworkId') artworkId: number) {
    return await this.artworkService.delete(artworkId);
  }
}
