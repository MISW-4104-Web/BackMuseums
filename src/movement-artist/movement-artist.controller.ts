import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ArtistDTO } from 'src/artist/artist.dto';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { MovementArtistService } from './movement-artist.service';
import { CacheInterceptor } from '@nestjs/common';

@Controller('movements')
@UseInterceptors(BusinessErrorsInterceptor, CacheInterceptor)
export class MovementArtistController {
  constructor(private readonly movementArtistService: MovementArtistService) {}

  @Get(':movementId/artists/:artistId')
  async findArtistByMovementIdArtistId(@Param('artistId') artistId: string, @Param('movementId') movementId: string) {
    return await this.movementArtistService.findArtistByMovementIdArtistId(artistId, movementId);
  }

  @Get(':movementId/artists')
  async findArtistsByMovementId(@Param('movementId') movementId: string) {
    return await this.movementArtistService.findArtistsByMovementId(movementId);
  }

  @Post(':movementId/artists/:artistId/')
  @HttpCode(200)
  async addMovementArtist(@Param('artistId') artistId: string, @Param('movementId') movementId: string) {
    return await this.movementArtistService.addMovementArtist(movementId, artistId);
  }

  @Put(':movementId/artists')
  async associateMovementArtist(@Param('movementId') movementId: string, @Body() artistDTO: ArtistDTO[]) {
    return await this.movementArtistService.associateMovementArtist(movementId, artistDTO);
  }

  @Delete(':movementId/artists/:artistId')
  @HttpCode(204)
  async deleteArtistToMovement(@Param('artistId') artistId: string, @Param('movementId') movementId: string) {
    return await this.movementArtistService.deleteArtistToMovement(artistId, movementId);
  }
}
