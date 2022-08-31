import { MovementArtistService } from './movement-artist.service';
import { MovementArtistController } from './movement-artist.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { Movement } from 'src/movement/movement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movement, ArtistEntity])],
    controllers: [MovementArtistController],
    providers: [MovementArtistService],
})
export class MovementArtistModule { }
