import { MuseumController } from './museum.controller';
import { MuseumService } from './museum.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumEntity } from './museum.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MuseumEntity])],
    controllers: [MuseumController],
    providers: [MuseumService],
})
export class MuseumModule { }
