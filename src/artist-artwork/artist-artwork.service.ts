import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Exhibition } from 'src/exhibition/exhibition.entity';
import { Museum } from 'src/museum/museum.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtworkDTO } from '../artwork/artwork.dto';
import { Artwork } from '../artwork/artwork.entity';

@Injectable()
export class ArtistArtworkService {
    constructor(
        @InjectRepository(Artwork)
        private readonly artworkRepository: Repository<Artwork>,
        @InjectRepository(Museum)
        private readonly museumRepository: Repository<Museum>,
        @InjectRepository(Exhibition)
        private readonly exhibitionRepository: Repository<Exhibition>,
        @InjectRepository(Artist)
        private readonly artistRepository: Repository<Artist>,
    ) { }

    async findAll(artistId: string): Promise<ArtworkDTO[]> {
        const artist = await this.artistRepository.findOne(artistId, { relations: ['artworks'] });
        if (!artist)
            throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
        return artist.artworks;
    }

    async findOne(artistId: string, artworkId: string): Promise<ArtworkDTO> {
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

    async create(artistId: string, artworkDTO: ArtworkDTO): Promise<ArtworkDTO> {
        let museum = null;
        if (artworkDTO.museum != null) {
            museum = await this.museumRepository.findOne(artworkDTO.museum.id);
            if (!museum)
                throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);
        }

        let exhibition = null;
        if (artworkDTO.exhibition != null) {
            exhibition = await this.exhibitionRepository.findOne(artworkDTO.exhibition.id);
            if (!exhibition)
                throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND);
        }

        const artist = await this.artistRepository.findOne(artistId);
        if (!artist)
            throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);

        const artwork = new Artwork();
        artwork.name = artworkDTO.name;
        artwork.year = artworkDTO.year;
        artwork.description = artworkDTO.description;
        artwork.type = artworkDTO.type;
        artwork.mainImage = artworkDTO.mainImage;
        artwork.museum = museum;
        artwork.exhibition = exhibition;
        artwork.artist = artist;
        return await this.artworkRepository.save(artwork);
    }

    async update(artistId: string, artworkId: string, artworkDTO: ArtworkDTO): Promise<ArtworkDTO> {
        const artwork = await this.artworkRepository.findOne(artworkId);
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)

        let museum = null;
        if (artworkDTO.museum != null) {
            museum = await this.museumRepository.findOne(artworkDTO.museum.id);
            if (!museum)
                throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);
        }

        let exhibition = null;
        if (artworkDTO.exhibition != null) {
            exhibition = await this.exhibitionRepository.findOne(artworkDTO.exhibition.id);
            if (!exhibition)
                throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND);
        }

        /*if (artworkDTO.artist == null)
          throw new BusinessLogicException("The artwork must have an artist association", BusinessError.PRECONDITION_FAILED);*/

        const artist = await this.artistRepository.findOne(artistId);
        if (!artist)
            throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);

        artwork.name = artworkDTO.name;
        artwork.year = artworkDTO.year;
        artwork.description = artworkDTO.description;
        artwork.type = artworkDTO.type;
        artwork.mainImage = artworkDTO.mainImage;
        artwork.museum = museum;
        artwork.exhibition = exhibition;
        artwork.artist = artist;

        await this.artworkRepository.save(artwork);
        return artwork;
    }

    async delete(artistId: string, artworkId: string) {
        const artist = await this.artistRepository.findOne(artistId, { relations: ['artworks'] });
        if (!artist)
            throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

        const artwork = await this.artworkRepository.findOne(artworkId);
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)

        artist.artworks = artist.artworks.filter(e => e.id !== artwork.id);
        await this.artistRepository.save(artist);
        return await this.artworkRepository.remove(artwork);
    }
}
