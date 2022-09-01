import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtworkDto } from 'src/artwork/artwork.dto';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { ExhibitionDto } from 'src/exhibition/exhibition.dto';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ExhibitionArtworkService {
  constructor(
    @InjectRepository(ExhibitionEntity)
    private readonly exhibitionRepository: Repository<ExhibitionEntity>,

    @InjectRepository(ArtworkEntity)
    private readonly artworkRepository: Repository<ArtworkEntity>
  ) {}

  async addExhibitionArtwork(exhibitionId: number, artworkId: number): Promise<ExhibitionDto> {
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
    
    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND);

    exhibition.artworks = [...exhibition.artworks, artwork];
    return await this.exhibitionRepository.save(exhibition);
  }

  async findArtworkByExhibitionIdArtworkId(artworkId: number, exhibitionId: number): Promise<ArtworkDto> {
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

  async findArtworksByExhibitionId(exhibitionId: number): Promise<ArtworkDto[]> {
    const exhibition: ExhibitionEntity = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    return exhibition.artworks.filter(p => p.constructor.name === "Artwork")
  }

  async associateExhibitionArtwork(exhibitionId: number, artworks: ArtworkEntity[]): Promise<ExhibitionDto> {
    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });

    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    artworks.forEach(async artworkEntity=>{
      const artwork = await this.artworkRepository.findOne(artworkEntity.id);
      if (!artwork)
        throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
    })

    exhibition.artworks = artworks;
    return await this.exhibitionRepository.save(exhibition);
  }

  async deleteArtworkToExhibition(artworkId: number, exhibitionId: number): Promise<ExhibitionDto> {
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)

    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    exhibition.artworks = exhibition.artworks.filter(e => e.id !== artworkId);
    return await this.exhibitionRepository.save(exhibition);
  }
}
