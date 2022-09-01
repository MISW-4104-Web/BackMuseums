import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { ExhibitionDto } from './exhibition.dto';
import { ExhibitionEntity } from './exhibition.entity';
import { ExhibitionService } from './exhibition.service';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}

  @Get('/:museumId/exhibitions')
  async findAll(@Param('museumId') museumId: number) {
    return await this.exhibitionService.findAll(museumId);
  }

  @Get('/:museumId/exhibitions/:exhibitionId')
  async findOne(@Param('museumId') museumId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionService.findOne(museumId, exhibitionId);
  }

  @Post('/:museumId/exhibitions/')
  @HttpCode(201)
  async create(@Param('museumId') museumId: number, @Body() exhibitionDto: ExhibitionDto) {
    const exhibition: ExhibitionEntity = plainToInstance(ExhibitionEntity, exhibitionDto);
    return await this.exhibitionService.create(museumId, exhibition);
  }

  @Put('/:museumId/exhibitions/:exhibitionId')
  async update(@Param('museumId') museumId: number, @Param('exhibitionId') exhibitionId: number, @Body() exhibitionDto: ExhibitionDto) {
    const exhibition: ExhibitionEntity = plainToInstance(ExhibitionEntity, exhibitionDto);
    return await this.exhibitionService.update(museumId, exhibitionId, exhibition);
  }

  @Delete('/:museumId/exhibitions/:exhibitionId')
  @HttpCode(204)
  async delete(@Param('museumId') museumId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionService.delete(museumId, exhibitionId);
  }
}
