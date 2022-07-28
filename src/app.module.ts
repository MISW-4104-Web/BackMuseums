import { ExhibitionArtworkModule } from './exhibition-artwork/exhibition-artwork.module';
import { MuseumArtworkModule } from './museum-artwork/museum-artwork.module';
import { MovementArtistModule } from './movement-artist/movement-artist.module';
import { ArtistMovementModule } from './artist-movement/artist-movement.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { ArtworkTypeModule } from './artworktype/artworktype.module';
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
import { ArtistArtworkModule } from './artist-artwork/artist-artwork.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ExhibitionArtworkModule,
    MuseumArtworkModule,
    MovementArtistModule,
    ArtistMovementModule,
    ArtistArtworkModule,
    SponsorModule,
    ArtworkTypeModule,
    MovementModule,
    ArtistModule,
    ImageModule,
    ArtworkModule,
    ExhibitionModule,
    MuseumModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:
        (process.env.DATABASE_URL &&
          process.env.DATABASE_URL.replace('postgres://', '')
            .split(':')[1]
            .split('@')[1]) ||
        process.env.DATABASE_URL ||
        process.env.DB_HOST ||
        'localhost',
      port: 5432,
      username:
        (process.env.DATABASE_URL &&
          process.env.DATABASE_URL.replace('postgres://', '')
            .split(':')[0]) ||
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
        (process.env.DATABASE_URL &&
          process.env.DATABASE_URL
            .split('/')[3]) ||
        process.env.DB_NAME ||
        'modern-art-museum',
      entities: [Artist, Artwork, Exhibition, Image, Movement, Museum, Sponsor],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsRun: true,
      cli: {
        migrationsDir: 'src/migrations',
      },
      extra: {
        //ssl: {
        //  rejectUnauthorized: false
        //}
      },
    }),
  ],
  controllers: [AppController]
})
export class AppModule { }
