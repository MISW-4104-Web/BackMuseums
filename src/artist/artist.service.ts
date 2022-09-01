import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { ImageEntity } from "../image/image.entity";

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,

    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>
  ) {}

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find({ relations: ["movements", "artworks", "image"] });
  }

  async findOne(artistId: number): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne(artistId, { relations: ["movements", "artworks", "image"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    
    return artist;
  }

  async create(artist: ArtistEntity): Promise<ArtistEntity> {
    const image = await this.imageRepository.findOne(artist.image.id)
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)

    artist.image = image;   
    return await this.artistRepository.save(artist); 
  }

  async update(artistId: number, artistEntity: ArtistEntity): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne(artistId, {relations: ["image"]});
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
     
    const image = await this.imageRepository.findOne(artistEntity.image.id)
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
    
    artistEntity.image = image;

    return await this.artistRepository.save({...artist, ...artistEntity});
  }

  async delete(artistId: number) {
    const artist = await this.artistRepository.findOne(artistId);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    
    return await this.artistRepository.remove(artist);
  }
}
