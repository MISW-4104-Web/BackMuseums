import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { ArtworkDTO } from '../artwork/artwork.dto';
import { ArtistArtworkService } from './artist-artwork.service';

@Controller('artists')
@UseInterceptors(BusinessErrorsInterceptor)
export class ArtistArtworkController {
    constructor(private readonly artworkService: ArtistArtworkService) { }

    @Get('/:artistId/artworks/:artworkId')
    async findOne(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string) {
        return await this.artworkService.findOne(artistId, artworkId);
    }

    @Get('/:artistId/artworks')
    async findAll(@Param('artistId') artistId: string) {
        return await this.artworkService.findAll(artistId);
    }

    @Post('/:artistId/artworks')
    @HttpCode(200)
    async create(@Param('artistId') artistId: string, @Body() artworkDTO: ArtworkDTO) {
        return await this.artworkService.create(artistId, artworkDTO);
    }

    @Put('/:artistId/artworks/:artworkId')
    async update(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string, @Body() artworkDTO: ArtworkDTO) {
        return await this.artworkService.update(artistId, artworkId, artworkDTO);
    }

    @Delete('/:artistId/artworks/:artworkId')
    @HttpCode(204)
    async delete(@Param('artistId') artistId: string, @Param('artworkId') artworkId: string) {
        return await this.artworkService.delete(artistId, artworkId);
    }
}
