import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { SponsorDTO } from './sponsor.dto';
import { SponsorService } from './sponsor.service';
import { CacheInterceptor } from '@nestjs/common';

@Controller('sponsors')
@UseInterceptors(BusinessErrorsInterceptor, CacheInterceptor)
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Get()
  async findAll() {
    return await this.sponsorService.findAll();
  }

  @Get(':sponsorId')
  async findOne(@Param('sponsorId') sponsorId: string) {
    return await this.sponsorService.findOne(sponsorId);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() sponsorDTO: SponsorDTO) {
    return await this.sponsorService.create(sponsorDTO);
  }

  @Put(':sponsorId')
  async update(@Param('sponsorId') sponsorId: string, @Body() sponsorDTO: SponsorDTO) {
    return await this.sponsorService.update(sponsorId, sponsorDTO);
  }

  @Delete(':sponsorId')
  @HttpCode(204)
  async delete(@Param('sponsorId') sponsorId: string) {
    return await this.sponsorService.delete(sponsorId);
  }
}
