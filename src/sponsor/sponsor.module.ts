import { SponsorController } from './sponsor.controller';
import { SponsorService } from './sponsor.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sponsor } from './sponsor.entity';
import { Exhibition } from 'src/exhibition/exhibition.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sponsor, Exhibition])],
    controllers: [SponsorController],
    providers: [SponsorService],
})
export class SponsorModule { }
