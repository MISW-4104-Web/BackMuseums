import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { MuseumDTO } from './museum.dto';
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
  @HttpCode(200)
  async create(@Body() museumDTO: MuseumDTO) {
    return await this.museumService.create(museumDTO);
  }

  @Put(':museumId')
  async update(@Param('museumId') museumId: number, @Body() museumDTO: MuseumDTO) {
    return await this.museumService.update(museumId, museumDTO);
  }

  @Delete(':museumId')
  @HttpCode(204)
  async delete(@Param('museumId') museumId: number) {
    return await this.museumService.delete(museumId);
  }
}
