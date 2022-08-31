import { ArtistMovementController } from './artist-movement.controller';
import { ArtistMovementService } from './artist-movement.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { Movement } from 'src/movement/movement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArtistEntity, Movement])],
    controllers: [ArtistMovementController],
    providers: [ArtistMovementService],
})
export class ArtistMovementModule { }
