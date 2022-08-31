import { ExhibitionController } from './exhibition.controller';
import { ExhibitionService } from './exhibition.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitionEntity } from './exhibition.entity';
import { Sponsor } from 'src/sponsor/sponsor.entity';
import { MuseumEntity } from 'src/museum/museum.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ExhibitionEntity, Sponsor, MuseumEntity])],
    controllers: [ExhibitionController],
    providers: [ExhibitionService],
})
export class ExhibitionModule { }
