import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) {}

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find({ relations: ["movements", "artworks"] });
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne(id, { relations: ["movements", "artworks"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    else
      return artist;
  }

  async create(artist: Artist): Promise<Artist> {
    return await this.artistRepository.save(artist);
  }

  async update(id: number, artistEntity: Artist): Promise<Artist> {
    const artist = await this.artistRepository.findOne(id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    
    artistEntity.id = artist.id;
    return await this.artistRepository.save(artistEntity);
  }

  async delete(id: number) {
    const artist = await this.artistRepository.findOne(id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    else
      return await this.artistRepository.remove(artist);
  }
}
