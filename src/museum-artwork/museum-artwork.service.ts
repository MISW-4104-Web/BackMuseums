/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtworkDTO } from 'src/artwork/artwork.dto';
import { Artwork } from 'src/artwork/artwork.entity';
import { MuseumDTO } from 'src/museum/museum.dto';
import { Museum } from 'src/museum/museum.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class MuseumArtworkService {
  constructor(
    @InjectRepository(Museum)
    private readonly museumRepository: Repository<Museum>,

    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>
  ) {}

  async addMuseumArtwork(museumId: string, artworkId: string): Promise<MuseumDTO> {
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
    
    const museum = await this.museumRepository.findOne(museumId, { relations : ["artworks"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    museum.artworks = [...museum.artworks, artwork];
    return await this.museumRepository.save(museum);
  }

  async findArtworkByMuseumIdArtworkId(artworkId: string, museumId: string): Promise<ArtworkDTO> {
    const artwork = await this.artworkRepository.findOne(artworkId);
      if (!artwork)
        throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
      
      const museum = await this.museumRepository.findOne(museumId, { relations : ["artworks"] });
      if (!museum)
        throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)

      const museumArtwork = museum.artworks.find(e => e.id === artwork.id);

      if (!museumArtwork)
        throw new BusinessLogicException("The artwork with the given id is not associated to the museum", BusinessError.PRECONDITION_FAILED)

      return museumArtwork;
  }

  async findArtworksByMuseumId(museumId: string): Promise<ArtworkDTO[]> {
    const museum: Museum = await this.museumRepository.findOne(museumId, { relations : ["artworks"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)

    return museum.artworks.filter(p => p.constructor.name === "Artwork")
  }

  async associateMuseumArtwork(museumId: string, artworkDTO: ArtworkDTO[]): Promise<MuseumDTO> {
    const museum = await this.museumRepository.findOne(museumId, { relations : ["artworks"] });

    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)

    let artworks: Artwork[] = [];

    for (let i = 0; i < artworkDTO.length; i++) {
      const artwork = await this.artworkRepository.findOne(artworkDTO[i].id);
      if (!artwork)
        throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
      else 
        artworks.push(artwork);
    }

    museum.artworks = artworks;
    return await this.museumRepository.save(museum);
  }

  async deleteArtworkToMuseum(artworkId: string, museumId: string): Promise<MuseumDTO> {
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)

    const museum = await this.museumRepository.findOne(museumId, { relations : ["artworks"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)

    museum.artworks = museum.artworks.filter(e => e.id !== artworkId);
    return await this.museumRepository.save(museum);
  }
}
