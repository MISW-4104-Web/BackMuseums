import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ArtworkDTO } from 'src/artwork/artwork.dto';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { MuseumArtworkService } from './museum-artwork.service';
import { CacheInterceptor } from '@nestjs/common';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor, CacheInterceptor)
export class MuseumArtworkController {
  constructor(private readonly museumArtworkService: MuseumArtworkService) {}

  @Get(':museumId/artworks/:artworkId')
  async findArtworkByMuseumIdArtworkId(@Param('artworkId') artworkId: string, @Param('museumId') museumId: string) {
    return await this.museumArtworkService.findArtworkByMuseumIdArtworkId(artworkId, museumId);
  }

  @Get(':museumId/artworks')
  async findArtworksByMuseumId(@Param('museumId') museumId: string) {
    return await this.museumArtworkService.findArtworksByMuseumId(museumId);
  }

  @Post(':museumId/artworks/:artworkId/')
  @HttpCode(200)
  async addMuseumArtwork(@Param('artworkId') artworkId: string, @Param('museumId') museumId: string) {
    return await this.museumArtworkService.addMuseumArtwork(museumId, artworkId);
  }

  @Put(':museumId/artworks')
  async associateMuseumArtwork(@Param('museumId') museumId: string, @Body() artworkDTO: ArtworkDTO[]) {
    return await this.museumArtworkService.associateMuseumArtwork(museumId, artworkDTO);
  }

  @Delete(':museumId/artworks/:artworkId')
  @HttpCode(204)
  async deleteArtworkToMuseum(@Param('artworkId') artworkId: string, @Param('museumId') museumId: string) {
    return await this.museumArtworkService.deleteArtworkToMuseum(artworkId, museumId);
  }
}
