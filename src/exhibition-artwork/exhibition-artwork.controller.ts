import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ArtworkDto } from 'src/artwork/artwork.dto';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { ExhibitionArtworkService } from './exhibition-artwork.service';

@Controller('exhibitions')
@UseInterceptors(BusinessErrorsInterceptor)
export class ExhibitionArtworkController {
  constructor(private readonly exhibitionArtworkService: ExhibitionArtworkService) {}

  @Get(':exhibitionId/artworks/:artworkId')
  async findArtworkByExhibitionIdArtworkId(@Param('artworkId') artworkId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionArtworkService.findArtworkByExhibitionIdArtworkId(artworkId, exhibitionId);
  }

  @Get(':exhibitionId/artworks')
  async findArtworksByExhibitionId(@Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionArtworkService.findArtworksByExhibitionId(exhibitionId);
  }

  @Post(':exhibitionId/artworks/:artworkId/')
  @HttpCode(200)
  async addExhibitionArtwork(@Param('artworkId') artworkId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionArtworkService.addExhibitionArtwork(exhibitionId, artworkId);
  }

  @Put(':exhibitionId/artworks')
  async associateExhibitionArtwork(@Param('exhibitionId') exhibitionId: number, @Body() artworksDTO: ArtworkDto[]) {
    const artworks = plainToInstance(ArtworkEntity, artworksDTO)
    return await this.exhibitionArtworkService.associateExhibitionArtwork(exhibitionId, artworks);
  }

  @Delete(':exhibitionId/artworks/:artworkId')
  @HttpCode(204)
  async deleteArtworkToExhibition(@Param('artworkId') artworkId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionArtworkService.deleteArtworkToExhibition(artworkId, exhibitionId);
  }
}
