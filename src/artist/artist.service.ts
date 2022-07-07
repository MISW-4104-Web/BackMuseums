import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtistDetailDTO } from './artist.detail.dto';
import { ArtistDTO } from './artist.dto';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) {}

  async findAll(): Promise<ArtistDetailDTO[]> {
    return await this.artistRepository.find({ relations: ["movements", "artworks"] });
  }

  async findOne(id: string): Promise<ArtistDetailDTO> {
    const artist = await this.artistRepository.findOne(id, { relations: ["movements", "artworks"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    else
      return artist;
  }

  async create(artistDTO: ArtistDTO): Promise<ArtistDTO> {
    const artist = new Artist();
    artist.name = artistDTO.name;
    artist.birthplace = artistDTO.birthplace;
    artist.birthdate = artistDTO.birthdate;
    artist.image = artistDTO.image;
    return await this.artistRepository.save(artist);
  }

  async update(id: string, artistDTO: ArtistDTO): Promise<ArtistDTO> {
    const artist = await this.artistRepository.findOne(id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    
    artist.name = artistDTO.name;
    artist.birthplace = artistDTO.birthplace;
    artist.birthdate = artistDTO.birthdate;
    artist.image = artistDTO.image;

    await this.artistRepository.save(artist);
    return artist;
  }

  async delete(id: string) {
    const artist = await this.artistRepository.findOne(id);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    else
      return await this.artistRepository.remove(artist);
  }
}
