/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { plainToInstance } from 'class-transformer';
import { MuseumDto } from './museum.dto';
import { MuseumEntity } from './museum.entity';
import { MuseumService } from './museum.service';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class MuseumController {
  constructor(private readonly museumService: MuseumService) {}

  @Get()
  async findAll() {
    return await this.museumService.findAll();
  }

  @Get(':museumId')
  async findOne(@Param('museumId') museumId: number) {
    return await this.museumService.findOne(museumId);
  }

  @Post()
  async create(@Body() museumDto: MuseumDto) {
    const museum: MuseumEntity = plainToInstance(MuseumEntity, museumDto);
    return await this.museumService.create(museum);
  }

  @Put(':museumId')
  async update(@Param('museumId') museumId: number, @Body() museumDto: MuseumDto) {
    const museum: MuseumEntity = plainToInstance(MuseumEntity, museumDto);
    return await this.museumService.update(museumId, museum);
  }

  @Delete(':museumId')
  @HttpCode(204)
  async delete(@Param('museumId') museumId: number) {
    return await this.museumService.delete(museumId);
  }
}
