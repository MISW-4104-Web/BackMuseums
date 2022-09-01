import { SponsorController } from './sponsor.controller';
import { SponsorService } from './sponsor.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorEntity } from './sponsor.entity';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SponsorEntity, ExhibitionEntity])],
    controllers: [SponsorController],
    providers: [SponsorService],
})
export class SponsorModule { }
