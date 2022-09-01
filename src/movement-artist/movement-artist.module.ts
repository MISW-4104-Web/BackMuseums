import { MovementArtistService } from './movement-artist.service';
import { MovementArtistController } from './movement-artist.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { MovementEntity } from 'src/movement/movement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MovementEntity, ArtistEntity])],
    controllers: [MovementArtistController],
    providers: [MovementArtistService],
})
export class MovementArtistModule { }
