import { ArtistMovementController } from './artist-movement.controller';
import { ArtistMovementService } from './artist-movement.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { MovementEntity } from 'src/movement/movement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArtistEntity, MovementEntity])],
    controllers: [ArtistMovementController],
    providers: [ArtistMovementService],
})
export class ArtistMovementModule { }
