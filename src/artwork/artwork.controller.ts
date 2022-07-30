import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { ArtworkService } from './artwork.service';
import { CacheInterceptor } from '@nestjs/common';

@Controller('artworks')
@UseInterceptors(BusinessErrorsInterceptor, CacheInterceptor)
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) { }

  @Get('/:artworkId')
  async findOne(@Param('artworkId') artworkId: string) {
    return await this.artworkService.findOne(artworkId);
  }

  @Get()
  async findAll() {
    return await this.artworkService.findAll();
  }

  /*
  @Post('/:artistId/artworks')
  @HttpCode(200)
  async create(@Param('artistId') artistId: string, @Body() artworkDTO: ArtworkDTO) {
    return await this.artworkService.create(artistId, artworkDTO);
  }

  @Put('/:artistId/artworks/:artworkId')
  async update(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string, @Body() artworkDTO: ArtworkDTO) {
    return await this.artworkService.update(artistId, artworkId, artworkDTO);
  }

  @Delete('/:artistId/artworks/:artworkId')
  @HttpCode(204)
  async delete(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string) {
    return await this.artworkService.delete(artistId, artworkId);
  }*/
}
