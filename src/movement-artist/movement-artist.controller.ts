import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ArtistDTO } from 'src/artist/artist.dto';
import { Artist } from 'src/artist/artist.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { MovementArtistService } from './movement-artist.service';

@Controller('movements')
@UseInterceptors(BusinessErrorsInterceptor)
export class MovementArtistController {
  constructor(private readonly movementArtistService: MovementArtistService) {}

  @Get(':movementId/artists/:artistId')
  async findArtistByMovementIdArtistId(@Param('artistId') artistId: number, @Param('movementId') movementId: number) {
    return await this.movementArtistService.findArtistByMovementIdArtistId(artistId, movementId);
  }

  @Get(':movementId/artists')
  async findArtistsByMovementId(@Param('movementId') movementId: number) {
    return await this.movementArtistService.findArtistsByMovementId(movementId);
  }

  @Post(':movementId/artists/:artistId/')
  @HttpCode(200)
  async addMovementArtist(@Param('artistId') artistId: number, @Param('movementId') movementId: number) {
    return await this.movementArtistService.addMovementArtist(movementId, artistId);
  }

  @Put(':movementId/artists')
  async associateMovementArtist(@Param('movementId') movementId: number, @Body() artistsDto: ArtistDTO[]) {
    const artists: Artist [] = plainToInstance(Artist, artistsDto)
    return await this.movementArtistService.associateMovementArtist(movementId, artists);
  }

  @Delete(':movementId/artists/:artistId')
  @HttpCode(204)
  async deleteArtistToMovement(@Param('artistId') artistId: number, @Param('movementId') movementId: number) {
    return await this.movementArtistService.deleteArtistToMovement(artistId, movementId);
  }
}
