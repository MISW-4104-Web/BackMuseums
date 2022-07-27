import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { ArtistDTO } from './artist.dto';
import { ArtistService } from './artist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('artists')
@UseGuards(JwtAuthGuard)
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

//  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':artistId')
  async findOne(@Param('artistId') artistId: string) {
    return await this.artistService.findOne(artistId);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() artistDTO: ArtistDTO) {
    return await this.artistService.create(artistDTO);
  }

  @Put(':artistId')
  async update(@Param('artistId') artistId: string, @Body() artistDTO: ArtistDTO) {
    return await this.artistService.update(artistId, artistDTO);
  }

  @Delete(':artistId')
  @HttpCode(204)
  async delete(@Param('artistId') artistId: string) {
    return await this.artistService.delete(artistId);
  }
}
