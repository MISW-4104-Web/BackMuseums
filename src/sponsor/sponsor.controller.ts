import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { SponsorDto } from './sponsor.dto';
import { SponsorEntity } from './sponsor.entity';
import { SponsorService } from './sponsor.service';

@Controller('sponsors')
@UseInterceptors(BusinessErrorsInterceptor)
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Get()
  async findAll() {
    return await this.sponsorService.findAll();
  }

  @Get(':sponsorId')
  async findOne(@Param('sponsorId') sponsorId: number) {
    return await this.sponsorService.findOne(sponsorId);
  }

  @Post()
  async create(@Body() sponsorDto: SponsorDto) {
    const sponsor = plainToInstance(SponsorEntity, sponsorDto)
    return await this.sponsorService.create(sponsor);
  }

  @Put(':sponsorId')
  async update(@Param('sponsorId') sponsorId: number, @Body() sponsorDto: SponsorDto) {
    const sponsor = plainToInstance(SponsorEntity, sponsorDto)
    return await this.sponsorService.update(sponsorId, sponsor);
  }

  @Delete(':sponsorId')
  @HttpCode(204)
  async delete(@Param('sponsorId') sponsorId: number) {
    return await this.sponsorService.delete(sponsorId);
  }
}
