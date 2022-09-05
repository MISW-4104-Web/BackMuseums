/* eslint-disable prettier/prettier */
import { ExhibitionArtworkModule } from './exhibition-artwork/exhibition-artwork.module';
import { MuseumArtworkModule } from './museum-artwork/museum-artwork.module';
import { MovementArtistModule } from './movement-artist/movement-artist.module';
import { ArtistMovementModule } from './artist-movement/artist-movement.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { MovementModule } from './movement/movement.module';
import { ArtistModule } from './artist/artist.module';
import { ImageModule } from './image/image.module';
import { ArtworkModule } from './artwork/artwork.module';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumModule } from './museum/museum.module';
import { Module } from '@nestjs/common';
import { MuseumEntity } from './museum/museum.entity';
import { ExhibitionEntity } from './exhibition/exhibition.entity';
import { ArtworkEntity } from './artwork/artwork.entity';
import { MovementEntity } from './movement/movement.entity';
import { ArtistEntity } from './artist/artist.entity';
import { SponsorEntity } from './sponsor/sponsor.entity';
import { ImageEntity } from './image/image.entity';
import { ArtistArtworkModule } from './artist-artwork/artist-artwork.module';
import { ArtworkImageModule } from './artwork-image/artwork-image.module';

@Module({
  imports: [
    ExhibitionArtworkModule,
    MuseumArtworkModule,
    MovementArtistModule,
    ArtistMovementModule,
    ArtistArtworkModule,
    SponsorModule,
    MovementModule,
    ArtistModule,
    ImageModule,
    ArtworkModule,
    ExhibitionModule,
    MuseumModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL && process.env.DATABASE_URL.replace('postgres://', '').split(':')[1].split('@')[1] || process.env.DATABASE_URL || process.env.DB_HOST || 'localhost',
      port: 5432,
      username:
        (process.env.DATABASE_URL &&
          process.env.DATABASE_URL.replace('postgres://', '').split(':')[0]) ||
        process.env.DB_USER ||
        'postgres',
      password:
        (process.env.DATABASE_URL &&
          process.env.DATABASE_URL.replace('postgres://', '')
            .split(':')[1]
            .split('@')[0]) ||
        process.env.DB_PASSWORD ||
        'postgres',
      database:
        (process.env.DATABASE_URL && process.env.DATABASE_URL.split('/')[3]) ||
        process.env.DB_NAME ||
        'modern-art-museum',
      entities: [ArtistEntity, ArtworkEntity, ExhibitionEntity, ImageEntity, MovementEntity, MuseumEntity, SponsorEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
      migrations: [__dirname + '/shared/migrations/**/*{.ts,.js}'],
      migrationsRun: true,
      /*cli: {
        migrationsDir: "src/shared/migrations"
      },*/
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    ArtworkImageModule,
  ],
})
export class AppModule { }
