import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { ArtworkDto } from './artwork.dto';
import { ArtworkEntity } from './artwork.entity';
import { ArtworkService } from './artwork.service';

@Controller('artworks')
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) { }

  @Get('/:artworkId')
  async findOne(@Param('artworkId') artworkId: number) {
    return await this.artworkService.findOne(artworkId);
  }

  @Get()
  async findAll() {
    return await this.artworkService.findAll();
  }

  @Post()
  async create(@Body() artworkDto: ArtworkDto) {
    const artwork: ArtworkEntity = plainToInstance(ArtworkEntity, artworkDto);
    return await this.artworkService.create(artwork);
  }

  @Put('/:artworkId')
  async update(@Param('artworkId') artworkId: number, @Body() artworkDto: ArtworkDto) {
    const artwork: ArtworkEntity = plainToInstance(ArtworkEntity, artworkDto);
    return await this.artworkService.update(artworkId, artwork);
  }

  @Delete('/:artworkId')
  @HttpCode(204)
  async delete(@Param('artworkId') artworkId: number) {
    return await this.artworkService.delete(artworkId);
  }
}
