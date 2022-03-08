import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ArtistDTO } from './artist.dto';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) {}

  async findAll(): Promise<ArtistDTO[]> {
    return await this.artistRepository.find({ relations: ["movements", "artworks"] });
  }

  async findOne(id: number): Promise<ArtistDTO> {
    const artist = await this.artistRepository.findOne(id, { relations: ["movements", "artworks"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    else
      return artist;
  }

  async create(artistDTO: ArtistDTO): Promise<ArtistDTO> {
    if (artistDTO.image == null)
      throw new BusinessLogicException("The artist must have an artist image association", BusinessError.PRECONDITION_FAILED);

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
    else
      return await this.artistRepository.remove(artist);
  }
}
