import { ExhibitionArtworkService } from './exhibition-artwork.service';
import { ExhibitionArtworkController } from './exhibition-artwork.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibition } from 'src/exhibition/exhibition.entity';
import { Artwork } from 'src/artwork/artwork.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Exhibition, Artwork])],
    controllers: [ExhibitionArtworkController],
    providers: [ExhibitionArtworkService],
})
export class ExhibitionArtworkModule { }
