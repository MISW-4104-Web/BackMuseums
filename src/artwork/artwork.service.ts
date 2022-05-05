import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Exhibition } from 'src/exhibition/exhibition.entity';
import { Museum } from 'src/museum/museum.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtworkDTO } from './artwork.dto';
import { Artwork } from './artwork.entity';

@Injectable()
export class ArtworkService {
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

  async findAll(): Promise<ArtworkDTO[]> {
    return await this.artworkRepository.find({ relations: ["images", "artist"] });
  }

  async findOne(artworkId: number): Promise<ArtworkDTO> {
    const artwork = await this.artworkRepository.findOne(artworkId, { relations: ["images", "artist"] });
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    return artwork;
  }

  /*
  async create(artistId: number, artworkDTO: ArtworkDTO): Promise<ArtworkDTO> {
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

  async update(artistId: number, artworkId: number, artworkDTO: ArtworkDTO): Promise<ArtworkDTO> {
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

  async delete(artistId: number, artworkId: number) {
    const artist = await this.artistRepository.findOne(artistId, { relations: ['artworks'] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    
    artist.artworks = artist.artworks.filter(e => e.id !== artwork.id);
    await this.artistRepository.save(artist);
    return await this.artworkRepository.remove(artwork);
  }*/
}
