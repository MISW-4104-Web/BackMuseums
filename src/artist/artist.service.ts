/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtistDTO } from './artist.dto';
import { Artist } from './artist.entity';
import { Image } from '../image/image.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  async findAll(): Promise<ArtistDTO[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: number): Promise<ArtistDTO> {
    const artist = await this.artistRepository.findOne(id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    else
      return artist;
  }

  async create(artistDTO: ArtistDTO): Promise<ArtistDTO> {
    const image = this.imageRepository.findOne(artistDTO.image.id);
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND);

    const artist = new Artist();
    artist.name = artistDTO.name;
    artist.birthplace = artistDTO.birthplace;
    artist.birthdate = artistDTO.birthdate;
    artist.image = artistDTO.image;
    return await this.artistRepository.save(artist);
  }

  async update(id: number, artistDTO: ArtistDTO): Promise<ArtistDTO> {
    const artist = await this.artistRepository.findOne(id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    
    const image = this.imageRepository.findOne(artistDTO.image.id);
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND);
    
    artist.name = artistDTO.name;
    artist.birthplace = artistDTO.birthplace;
    artist.birthdate = artistDTO.birthdate;
    artist.image = artistDTO.image;

    await this.artistRepository.save(artist);
    return artist;
  }

  async delete(id: number) {
    const artist = await this.artistRepository.findOne(id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    else {
      this.imageRepository.remove(artist.image);
      return await this.artistRepository.remove(artist);
    }
  }
}
