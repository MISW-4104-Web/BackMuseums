/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { MovementDTO } from 'src/movement/movement.dto';
import { ArtistMovementService } from './artist-movement.service';

@Controller('artists')
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtistMovementController {
  constructor(private readonly artistMovementService: ArtistMovementService) {}

  @Get(':artistId/movements/:movementId')
  async findMovementByArtistIdMovementId(@Param('movementId') movementId: number, @Param('artistId') artistId: number) {
    return await this.artistMovementService.findMovementByArtistIdMovementId(movementId, artistId);
  }

  @Get(':artistId/movements')
  async findMovementsByArtistId(@Param('artistId') artistId: number) {
    return await this.artistMovementService.findMovementsByArtistId(artistId);
  }

  @Post(':artistId/movements/:movementId/')
  @HttpCode(200)
  async addArtistMovement(@Param('movementId') movementId: number, @Param('artistId') artistId: number) {
    return await this.artistMovementService.addArtistMovement(artistId, movementId);
  }

  @Put(':artistId/movements')
  async associateArtistMovement(@Param('artistId') artistId: number, @Body() movementDTO: MovementDTO[]) {
    return await this.artistMovementService.associateArtistMovement(artistId, movementDTO);
  }

  @Delete(':artistId/movements/:movementId')
  @HttpCode(204)
  async deleteMovementToArtist(@Param('movementId') movementId: number, @Param('artistId') artistId: number) {
    return await this.artistMovementService.deleteMovementToArtist(movementId, artistId);
  }
}
