import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Artist])],
    controllers: [ArtistController],
    providers: [ArtistService],
})
export class ArtistModule { }
