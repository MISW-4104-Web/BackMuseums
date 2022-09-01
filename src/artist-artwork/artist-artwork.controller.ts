import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { ArtworkDto } from '../artwork/artwork.dto';
import { ArtistArtworkService } from './artist-artwork.service';

@Controller('artists')
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtistArtworkController {
    constructor(private readonly artworkService: ArtistArtworkService) { }

    @Get('/:artistId/artworks/:artworkId')
    async findOne(@Param('artistId') artistId: number, @Param('artworkId') artworkId: number) {
        return await this.artworkService.findArtworkFromArtist(artistId, artworkId);
    }

    @Get('/:artistId/artworks')
    async findAll(@Param('artistId') artistId: number) {
        return await this.artworkService.findArtworksFromArtist(artistId);
    }

    @Post('/:artistId/artworks/:artworkId')
    async create(@Param('artistId') artistId: number, @Param('artworkId') artworkId: number) {
        return await this.artworkService.addArtworkToArtist(artistId, artworkId);
    }

    @Put('/:artistId/artworks')
    async update(@Param('artistId') artistId: number, @Body() artworksDto: ArtworkDto[]) {
        const artworks : ArtworkEntity [] = plainToInstance(ArtworkEntity, artworksDto);
        return await this.artworkService.updateArtworksFromArtist(artistId, artworks);
    }

    @Delete('/:artistId/artworks/:artworkId')
    @HttpCode(204)
    async delete(@Param('artistId') artistId: number, @Param('artworkId') artworkId: number) {
        return await this.artworkService.deleteArtworkFromArtist(artistId, artworkId);
    }
}
