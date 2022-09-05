import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ArtistDto } from 'src/artist/artist.dto';
import { ArtistEntity } from 'src/artist/artist.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { MovementArtistService } from './movement-artist.service';

@Controller('movements')
@UseInterceptors(BusinessErrorsInterceptor)
export class MovementArtistController {
  constructor(private readonly movementArtistService: MovementArtistService) {}

  @Get(':movementId/artists/:artistId')
  async findArtistFromMovement(@Param('artistId') artistId: number, @Param('movementId') movementId: number) {
    return await this.movementArtistService.findArtistFromMovement(movementId, artistId)
  }

  @Get(':movementId/artists')
  async findArtistsFromMovement(@Param('movementId') movementId: number) {
    return await this.movementArtistService.findArtistsFromMovement(movementId);
  }

  @Post(':movementId/artists/:artistId/')
  async addMovementArtist(@Param('artistId') artistId: number, @Param('movementId') movementId: number) {
    return await this.movementArtistService.addMovementArtist(movementId, artistId);
  }

  @Put(':movementId/artists')
  async updateArtistsFromMovement(@Param('movementId') movementId: number, @Body() artistsDto: ArtistDto[]) {
    const artists: ArtistEntity [] = plainToInstance(ArtistEntity, artistsDto)
    return await this.movementArtistService.updateArtistsFromMovement(movementId, artists);
  }

  @Delete(':movementId/artists/:artistId')
  @HttpCode(204)
  async deleteArtistFromMovement(@Param('artistId') artistId: number, @Param('movementId') movementId: number) {
    return await this.movementArtistService.deleteArtistFromMovement(movementId, artistId);
  }
}
