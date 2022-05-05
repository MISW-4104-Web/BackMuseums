import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { ArtworkDTO } from './artwork.dto';
import { ArtworkService } from './artwork.service';

@Controller('artworks')
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) { }

  @Get('/:artworkId')
  async findOne(@Param('artworkId') artworkId: number) {
    return await this.artworkService.findOne(artworkId);
  }

  @Get()
  async findAll() {
    return await this.artworkService.findAll();
  }

  /*
  @Post('/:artistId/artworks')
  @HttpCode(200)
  async create(@Param('artistId') artistId: number, @Body() artworkDTO: ArtworkDTO) {
    return await this.artworkService.create(artistId, artworkDTO);
  }

  @Put('/:artistId/artworks/:artworkId')
  async update(@Param('artistId') artistId: number, @Param('artworkId') artworkId: number, @Body() artworkDTO: ArtworkDTO) {
    return await this.artworkService.update(artistId, artworkId, artworkDTO);
  }

  @Delete('/:artistId/artworks/:artworkId')
  @HttpCode(204)
  async delete(@Param('artistId') artistId: number, @Param('artworkId') artworkId: number) {
    return await this.artworkService.delete(artistId, artworkId);
  }*/
}
