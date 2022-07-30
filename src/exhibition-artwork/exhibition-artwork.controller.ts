import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ArtworkDTO } from 'src/artwork/artwork.dto';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { ExhibitionArtworkService } from './exhibition-artwork.service';
import { CacheInterceptor } from '@nestjs/common';

@Controller('exhibitions')
@UseInterceptors(BusinessErrorsInterceptor, CacheInterceptor)
export class ExhibitionArtworkController {
  constructor(private readonly exhibitionArtworkService: ExhibitionArtworkService) {}

  @Get(':exhibitionId/artworks/:artworkId')
  async findArtworkByExhibitionIdArtworkId(@Param('artworkId') artworkId: string, @Param('exhibitionId') exhibitionId: string) {
    return await this.exhibitionArtworkService.findArtworkByExhibitionIdArtworkId(artworkId, exhibitionId);
  }

  @Get(':exhibitionId/artworks')
  async findArtworksByExhibitionId(@Param('exhibitionId') exhibitionId: string) {
    return await this.exhibitionArtworkService.findArtworksByExhibitionId(exhibitionId);
  }

  @Post(':exhibitionId/artworks/:artworkId/')
  @HttpCode(200)
  async addExhibitionArtwork(@Param('artworkId') artworkId: string, @Param('exhibitionId') exhibitionId: string) {
    return await this.exhibitionArtworkService.addExhibitionArtwork(exhibitionId, artworkId);
  }

  @Put(':exhibitionId/artworks')
  async associateExhibitionArtwork(@Param('exhibitionId') exhibitionId: string, @Body() artworkDTO: ArtworkDTO[]) {
    return await this.exhibitionArtworkService.associateExhibitionArtwork(exhibitionId, artworkDTO);
  }

  @Delete(':exhibitionId/artworks/:artworkId')
  @HttpCode(204)
  async deleteArtworkToExhibition(@Param('artworkId') artworkId: string, @Param('exhibitionId') exhibitionId: string) {
    return await this.exhibitionArtworkService.deleteArtworkToExhibition(artworkId, exhibitionId);
  }
}
