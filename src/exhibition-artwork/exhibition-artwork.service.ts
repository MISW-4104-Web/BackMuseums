import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { ExhibitionDto } from 'src/exhibition/exhibition.dto';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { MuseumEntity } from 'src/museum/museum.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ExhibitionArtworkService {
  constructor(
    @InjectRepository(ExhibitionEntity)
    private readonly exhibitionRepository: Repository<ExhibitionEntity>,

    @InjectRepository(ArtworkEntity)
    private readonly artworkRepository: Repository<ArtworkEntity>,

    @InjectRepository(MuseumEntity)
    private readonly museumRepository: Repository<MuseumEntity>
  ) {}

  async addArtworkToExhibition(museumId: number, exhibitionId: number, artworkId: number): Promise<ExhibitionEntity> {
    const museum = await this.museumRepository.findOne(museumId, { relations : ["exhibitions"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND);
    
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
        
    exhibition.artworks = [...exhibition.artworks, artwork];
    return await this.exhibitionRepository.save(exhibition);
  }

  async findArtworkFromExhibition(museumId: number, exhibitionId: number, artworkId: number, ): Promise<ArtworkEntity> {
    const museum = await this.museumRepository.findOne(museumId, { relations : ["exhibitions"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);
    
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
        throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
      
    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    const exhibitionArtwork = exhibition.artworks.find(e => e.id === artwork.id);

    if (!exhibitionArtwork)
      throw new BusinessLogicException("The artwork with the given id is not associated to the exhibition", BusinessError.PRECONDITION_FAILED)

    return exhibitionArtwork;
  }

  async findArtworksByExhibition(museumId: number, exhibitionId: number): Promise<ArtworkEntity[]> {
    const museum = await this.museumRepository.findOne(museumId, { relations : ["exhibitions"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    const exhibition: ExhibitionEntity = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    const persitedExhibition = museum.exhibitions.find(e=>e.id = exhibitionId)
    if (!persitedExhibition)
    throw new BusinessLogicException("The exhibition is not associated to the museum", BusinessError.PRECONDITION_FAILED)

    return exhibition.artworks;
  }

  async updateExhibitionsFromArtwork(museumId: number, exhibitionId: number, artworks: ArtworkEntity[]): Promise<ExhibitionEntity> {
    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });

    const museum = await this.museumRepository.findOne(museumId, { relations : ["exhibitions"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    for(let artworkEntity of artworks) {
      const artwork = await this.artworkRepository.findOne(artworkEntity.id);
      if (!artwork)
        throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    }

    exhibition.artworks = artworks;
    return await this.exhibitionRepository.save(exhibition);
  }

  async deleteArtworkFromExhibition(museumId: number, exhibitionId: number, artworkId: number){
    const museum = await this.museumRepository.findOne(museumId, { relations : ["exhibitions"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)

    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    exhibition.artworks = exhibition.artworks.filter(e => e.id !== artworkId);
    await this.exhibitionRepository.save(exhibition);
  }
}
