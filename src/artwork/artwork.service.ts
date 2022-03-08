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
  ) {}

  async findAll(): Promise<ArtworkDTO[]> {
    return await this.artworkRepository.find({ relations : ['exhibition', 'museum', 'images', 'artist'] });
  }

  async findOne(id: number): Promise<ArtworkDTO> {
    const artwork = await this.artworkRepository.findOne(id, { relations: ['exhibition', 'museum', 'images', 'artist'] });
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    else
      return artwork;
  }

  async create(artworkDTO: ArtworkDTO): Promise<ArtworkDTO> {
    if (artworkDTO.museum == null)
      throw new BusinessLogicException("The artwork must have a museum association", BusinessError.PRECONDITION_FAILED);

    const museum = await this.museumRepository.findOne(artworkDTO.museum.id);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    if (artworkDTO.exhibition == null)
      throw new BusinessLogicException("The artwork must have an exhibition association", BusinessError.PRECONDITION_FAILED);

    const exhibition = await this.exhibitionRepository.findOne(artworkDTO.exhibition.id);
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND);
    
    if (artworkDTO.artist == null)
      throw new BusinessLogicException("The artwork must have an artist association", BusinessError.PRECONDITION_FAILED);

    const artist = await this.artistRepository.findOne(artworkDTO.artist.id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);

    const artwork = new Artwork();
    artwork.name = artworkDTO.name;
    artwork.year = artworkDTO.year;
    artwork.description = artworkDTO.description;
    artwork.type = artworkDTO.type;
    artwork.museum = museum;
    artwork.exhibition = exhibition;
    artwork.artist = artist;
    return await this.artworkRepository.save(artwork);
  }

  async update(id: number, artworkDTO: ArtworkDTO): Promise<ArtworkDTO> {
    const artwork = await this.artworkRepository.findOne(id);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    
    if (artworkDTO.museum == null)
      throw new BusinessLogicException("The artwork must have a museum association", BusinessError.PRECONDITION_FAILED);

    const museum = await this.museumRepository.findOne(artworkDTO.museum.id);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    if (artworkDTO.exhibition == null)
      throw new BusinessLogicException("The artwork must have an exhibition association", BusinessError.PRECONDITION_FAILED);

    const exhibition = await this.exhibitionRepository.findOne(artworkDTO.exhibition.id);
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND);

    if (artworkDTO.artist == null)
      throw new BusinessLogicException("The artwork must have an artist association", BusinessError.PRECONDITION_FAILED);

    const artist = await this.artistRepository.findOne(artworkDTO.artist.id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);

    artwork.name = artworkDTO.name;
    artwork.year = artworkDTO.year;
    artwork.description = artworkDTO.description;
    artwork.type = artworkDTO.type;
    artwork.museum = museum;
    artwork.exhibition = exhibition;
    artwork.artist = artist;

    await this.artworkRepository.save(artwork);
    return artwork;
  }

  async delete(id: number) {
    const artwork = await this.artworkRepository.findOne(id);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    else
      return await this.artworkRepository.remove(artwork);
  }
}
