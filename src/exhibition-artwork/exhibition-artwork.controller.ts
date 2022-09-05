import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ArtworkDto } from 'src/artwork/artwork.dto';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { ExhibitionArtworkService } from './exhibition-artwork.service';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class ExhibitionArtworkController {
  constructor(private readonly exhibitionArtworkService: ExhibitionArtworkService) {}

  @Get(':museumId/exhibitions/:exhibitionId/artworks/:artworkId')
  async findArtworkFromExhibition(@Param('museumId') museumId: number, @Param('artworkId') artworkId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionArtworkService.findArtworkFromExhibition(museumId, exhibitionId, artworkId)
  }

  @Get(':museumId/exhibitions/:exhibitionId/artworks')
  async findArtworksFromExhibition(@Param('museumId') museumId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionArtworkService.findArtworksByExhibition(museumId, exhibitionId);
  }

  @Post(':museumId/exhibitions/:exhibitionId/artworks/:artworkId/')
  async addArtworkToExhibition(@Param('museumId') museumId: number, @Param('artworkId') artworkId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionArtworkService.addArtworkToExhibition(museumId, exhibitionId, artworkId);
  }

  @Put(':museumId/exhibitions/:exhibitionId/artworks')
  async updateExhibitionsFromArtwork(@Param('museumId') museumId: number, @Param('exhibitionId') exhibitionId: number, @Body() artworksDTO: ArtworkDto[]) {
    const artworks = plainToInstance(ArtworkEntity, artworksDTO)
    return await this.exhibitionArtworkService.updateExhibitionsFromArtwork(museumId, exhibitionId, artworks);
  }

  @Delete(':museumId/exhibitions/:exhibitionId/artworks/:artworkId')
  @HttpCode(204)
  async deleteArtworkFromExhibition(@Param('museumId') museumId: number, @Param('artworkId') artworkId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionArtworkService.deleteArtworkFromExhibition(museumId, exhibitionId, artworkId);
  }
}
