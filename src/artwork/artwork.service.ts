import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtworkEntity } from './artwork.entity';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(ArtworkEntity)
    private readonly artworkRepository: Repository<ArtworkEntity>,

    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) { }

  async findAll(): Promise<ArtworkEntity[]> {
    return await this.artworkRepository.find({ relations: ["images", "artist"] });
  }

  async findOne(artworkId: number): Promise<ArtworkEntity> {
    const artwork = await this.artworkRepository.findOne(artworkId, { relations: ["images", "artist"] });
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    return artwork;
  }

  async create(artwork: ArtworkEntity): Promise<ArtworkEntity> {
    const artist: ArtistEntity = await this.artistRepository.findOne(artwork.artist.id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    
    artwork.artist = artist;
    return await this.artworkRepository.save(artwork);
  }

  async update(artworkId: number, artworkEntity: ArtworkEntity): Promise<ArtworkEntity> {
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    
    const artist: ArtistEntity = await this.artistRepository.findOne(artworkEntity.artist.id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
     
    artworkEntity.artist = artist;
    
    return await this.artworkRepository.save({...artwork, ...artworkEntity});
  }

  async delete(artworkId: number) {
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    
    await this.artworkRepository.remove(artwork);
  }
}
