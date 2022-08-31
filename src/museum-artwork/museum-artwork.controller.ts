import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ArtworkDto } from 'src/artwork/artwork.dto';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { MuseumArtworkService } from './museum-artwork.service';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class MuseumArtworkController {
  constructor(private readonly museumArtworkService: MuseumArtworkService) {}

  @Get(':museumId/artworks/:artworkId')
  async findArtworkByMuseumIdArtworkId(@Param('artworkId') artworkId: number, @Param('museumId') museumId: number) {
    return await this.museumArtworkService.findArtworkByMuseumIdArtworkId(artworkId, museumId);
  }

  @Get(':museumId/artworks')
  async findArtworksByMuseumId(@Param('museumId') museumId: number) {
    return await this.museumArtworkService.findArtworksByMuseumId(museumId);
  }

  @Post(':museumId/artworks/:artworkId/')
  @HttpCode(200)
  async addMuseumArtwork(@Param('artworkId') artworkId: number, @Param('museumId') museumId: number) {
    return await this.museumArtworkService.addMuseumArtwork(museumId, artworkId);
  }

  @Put(':museumId/artworks')
  async associateMuseumArtwork(@Param('museumId') museumId: number, @Body() artworkDTO: ArtworkDto[]) {
    return await this.museumArtworkService.associateMuseumArtwork(museumId, artworkDTO);
  }

  @Delete(':museumId/artworks/:artworkId')
  @HttpCode(204)
  async deleteArtworkToMuseum(@Param('artworkId') artworkId: number, @Param('museumId') museumId: number) {
    return await this.museumArtworkService.deleteArtworkToMuseum(artworkId, museumId);
  }
}
