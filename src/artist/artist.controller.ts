import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { ArtistDto } from './artist.dto';
import { ArtistEntity } from './artist.entity';
import { ArtistService } from './artist.service';

@Controller('artists')
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':artistId')
  async findOne(@Param('artistId') artistId: number) {
    return await this.artistService.findOne(artistId);
  }

  @Post()
  async create(@Body() artistDTO: ArtistDto) {
    const artist: ArtistEntity = plainToInstance(ArtistEntity, artistDTO);
    return await this.artistService.create(artist);
  }

  @Put(':artistId')
  async update(@Param('artistId') artistId: number, @Body() artistDTO: ArtistDto) {
    const artist: ArtistEntity = plainToInstance(ArtistEntity, artistDTO);
    return await this.artistService.update(artistId, artist);
  }

  @Delete(':artistId')
  @HttpCode(204)
  async delete(@Param('artistId') artistId: number) {
    return await this.artistService.delete(artistId);
  }
}
