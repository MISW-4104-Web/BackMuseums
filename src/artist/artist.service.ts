import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>
  ) {}

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find({ relations: ["movements", "artworks"] });
  }

  async findOne(id: number): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne(id, { relations: ["movements", "artworks"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    
    return artist;
  }

  async create(artist: ArtistEntity): Promise<ArtistEntity> {
    return await this.artistRepository.save(artist);
  }

  async update(id: number, artistEntity: ArtistEntity): Promise<ArtistEntity> {
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
    
    return await this.artistRepository.remove(artist);
  }
}
