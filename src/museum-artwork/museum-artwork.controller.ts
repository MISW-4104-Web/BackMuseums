import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ArtworkDto } from 'src/artwork/artwork.dto';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { MuseumArtworkService } from './museum-artwork.service';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class MuseumArtworkController {
  constructor(private readonly museumArtworkService: MuseumArtworkService) {}

  @Get(':museumId/artworks/:artworkId')
  async findArtworkFromMuseum(@Param('artworkId') artworkId: number, @Param('museumId') museumId: number) {
    return await this.museumArtworkService.findArtworkFromMuseum(museumId, artworkId)
  }

  @Get(':museumId/artworks')
  async findArtworksFromMuseum(@Param('museumId') museumId: number) {
    return await this.museumArtworkService.findArtworksFromMuseum(museumId)
  }

  @Post(':museumId/artworks/:artworkId/')
  async addArtworkToMuseum(@Param('artworkId') artworkId: number, @Param('museumId') museumId: number) {
    return await this.museumArtworkService.addArtworkToMuseum(museumId, artworkId)
  }

  @Put(':museumId/artworks')
  async updateArtworksFromMuseum(@Param('museumId') museumId: number, @Body() artworksDTO: ArtworkDto[]) {
    const artworks = plainToInstance(ArtworkEntity, artworksDTO)
    return await this.museumArtworkService.updateArtworksFromMuseum(museumId, artworks);
  }

  @Delete(':museumId/artworks/:artworkId')
  @HttpCode(204)
  async deleteArtworkToMuseum(@Param('artworkId') artworkId: number, @Param('museumId') museumId: number) {
    return await this.museumArtworkService.deleteArtworkFromMuseum(museumId, artworkId);
  }
}
