import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from '../artwork/artwork.entity';
import { Exhibition } from '../exhibition/exhibition.entity';
import { Artist } from '../artist/artist.entity';
import { Image } from '../image/image.entity';
import { Movement } from '../movement/movement.entity';
import { Museum } from '../museum/museum.entity';
import { Sponsor } from '../sponsor/sponsor.entity';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [Artist, Artwork, Exhibition, Image, Movement, Museum, Sponsor],
    synchronize: true,
    keepConnectionAlive: true 
  }),
  TypeOrmModule.forFeature([Artist, Artwork, Exhibition, Image, Movement, Museum, Sponsor]),
];