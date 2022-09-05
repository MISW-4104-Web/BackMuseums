import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { MuseumEntity } from 'src/museum/museum.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class MuseumArtworkService {
  constructor(
    @InjectRepository(MuseumEntity)
    private readonly museumRepository: Repository<MuseumEntity>,

    @InjectRepository(ArtworkEntity)
    private readonly artworkRepository: Repository<ArtworkEntity>
  ) {}

  async addArtworkToMuseum(museumId: number, artworkId: number): Promise<MuseumEntity> {
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
    
    const museum = await this.museumRepository.findOne(museumId, { relations : ["artworks"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    museum.artworks = [...museum.artworks, artwork];
    return await this.museumRepository.save(museum);
  }

  async findArtworkFromMuseum(museumId: number, artworkId: number): Promise<ArtworkEntity> {
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

  async findArtworksFromMuseum(museumId: number): Promise<ArtworkEntity[]> {
    const museum: MuseumEntity = await this.museumRepository.findOne(museumId, { relations : ["artworks"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)

    return museum.artworks
  }

  async updateArtworksFromMuseum(museumId: number, artworks: ArtworkEntity[]): Promise<MuseumEntity> {
    const museum = await this.museumRepository.findOne(museumId, { relations : ["artworks"] });

    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)

    for(let artworkEntity of artworks) {
      const artwork = await this.artworkRepository.findOne(artworkEntity.id);
      if (!artwork)
        throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
    }

    museum.artworks = artworks;
    return await this.museumRepository.save(museum);
  }

  async deleteArtworkFromMuseum(museumId: number, artworkId: number): Promise<MuseumEntity> {
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
