import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtworkEntity } from '../artwork/artwork.entity';

@Injectable()
export class ArtistArtworkService {
    constructor(
        @InjectRepository(ArtworkEntity)
        private readonly artworkRepository: Repository<ArtworkEntity>,

        @InjectRepository(ArtistEntity)
        private readonly artistRepository: Repository<ArtistEntity>,
    ) { }

    async findArtworksFromArtist(artistId: number): Promise<ArtworkEntity[]> {
        const artist = await this.artistRepository.findOne(artistId, { relations: ['artworks'] });
        if (!artist)
            throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
        return artist.artworks;
    }

    async findArtworkFromArtist(artistId: number, artworkId: number): Promise<ArtworkEntity> {
        const artist = await this.artistRepository.findOne(artistId, { relations: ["artworks"] });
        if (!artist)
            throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);

        const artwork = await this.artworkRepository.findOne(artworkId, { relations: ["artist"] });
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)

        const artworkartist = artist.artworks.find(e => e.id === artwork.id);
        if (!artworkartist)
            throw new BusinessLogicException("The artwork is not associated to the artist", BusinessError.NOT_FOUND)

        return artwork;
    }

    async addArtworkToArtist(artistId: number, artworkId: number): Promise<ArtworkEntity> {

        const artist = await this.artistRepository.findOne(artistId);
        if (!artist)
            throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
        
        const artwork = await this.artworkRepository.findOne(artworkId);
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);

        artwork.artist = artist;
        
        return await this.artworkRepository.save(artwork);
    }

    
    async updateArtworksFromArtist(artistId: number, artworks: ArtworkEntity[]): Promise<ArtworkEntity[]> {
        const artist = await this.artistRepository.findOne(artistId);
        if (!artist)
            throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

        const updatedArtworks: ArtworkEntity[] = [];
        
        for(let artworkEntity of artworks){
            const artwork = await this.artworkRepository.findOne(artworkEntity.id);
            if (!artwork)
                throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)    
            artwork.artist = artist;
            updatedArtworks.push(await this.artworkRepository.save(artwork));
        } 
         
        return updatedArtworks;
    }

    async deleteArtworkFromArtist(artistId: number, artworkId: number) {
        const artist = await this.artistRepository.findOne(artistId, { relations: ['artworks'] });
        if (!artist)
            throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

        const artwork = await this.artworkRepository.findOne(artworkId);
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)

        artist.artworks = artist.artworks.filter(e => e.id !== artwork.id);
        await this.artistRepository.save(artist);
    }
}
