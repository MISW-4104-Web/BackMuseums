import { MuseumController } from './museum.controller';
import { MuseumService } from './museum.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Museum } from './museum.entity';
import { MuseumResolver } from './museum.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Museum])],
    controllers: [MuseumController],
    providers: [MuseumService, MuseumResolver],
})
export class MuseumModule { }
