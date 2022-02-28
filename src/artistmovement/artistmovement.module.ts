import { ArtistMovementController } from './artistmovement.controller';
import { ArtistMovementService } from './artistmovement.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Movement } from 'src/movement/movement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Artist, Movement])],
    controllers: [ArtistMovementController],
    providers: [ArtistMovementService],
})
export class ArtistmovementModule { }
