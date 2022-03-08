import { ArtistMovementModule } from './artist-movement/artist-movement.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { TypeModule } from './type/type.module';
import { MovementModule } from './movement/movement.module';
import { ArtistModule } from './artist/artist.module';
import { ImageModule } from './image/image.module';
import { ArtworkModule } from './artwork/artwork.module';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumModule } from './museum/museum.module';
import { Module } from '@nestjs/common';
import { Museum } from './museum/museum.entity';
import { Exhibition } from './exhibition/exhibition.entity';
import { Artwork } from './artwork/artwork.entity';
import { Movement } from './movement/movement.entity';
import { Artist } from './artist/artist.entity';
import { Sponsor } from './sponsor/sponsor.entity';
import { Image } from './image/image.entity';

@Module({
  imports: [
    ArtistMovementModule,
    SponsorModule,
    TypeModule,
    MovementModule,
    ArtistModule,
    ImageModule,
    ArtworkModule,
    ExhibitionModule,
    MuseumModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'modern-art-museum',
      entities: [Artist, Artwork, Exhibition, Image, Movement, Museum, Sponsor],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
      migrations: [__dirname + '/migration/**/*{.ts,.js}'],
      migrationsRun: false,
    }),
  ],
})
export class AppModule { }
