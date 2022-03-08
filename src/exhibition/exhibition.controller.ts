import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { ExhibitionDTO } from './exhibition.dto';
import { ExhibitionService } from './exhibition.service';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}

  @Get('/:museumId/exhibitions/')
  async findAll(@Param('museumId') museumId: number) {
    return await this.exhibitionService.findAll(museumId);
  }

  @Get('/:museumId/exhibitions/:exhibitionId')
  async findOne(@Param('museumId') museumId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionService.findOne(museumId, exhibitionId);
  }

  @Post('/:museumId/exhibitions/')
  @HttpCode(200)
  async create(@Param('museumId') museumId: number, @Body() exhibitionDTO: ExhibitionDTO) {
    return await this.exhibitionService.create(museumId, exhibitionDTO);
  }

  @Put('/:museumId/exhibitions/:exhibitionId')
  async update(@Param('museumId') museumId: number, @Param('exhibitionId') exhibitionId: number, @Body() exhibitionDTO: ExhibitionDTO) {
    return await this.exhibitionService.update(museumId, exhibitionId, exhibitionDTO);
  }

  @Delete('/:museumId/exhibitions/:exhibitionId')
  @HttpCode(204)
  async delete(@Param('museumId') museumId: number, @Param('exhibitionId') exhibitionId: number) {
    return await this.exhibitionService.delete(museumId, exhibitionId);
  }
}
