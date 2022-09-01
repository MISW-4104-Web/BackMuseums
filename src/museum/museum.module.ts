import { MuseumController } from './museum.controller';
import { MuseumService } from './museum.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumEntity } from './museum.entity';
import { ImageEntity } from 'src/image/image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MuseumEntity, ImageEntity])],
    controllers: [MuseumController],
    providers: [MuseumService],
})
export class MuseumModule { }
