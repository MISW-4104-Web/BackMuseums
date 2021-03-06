import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtworkDTO } from 'src/artwork/artwork.dto';
import { Artwork } from 'src/artwork/artwork.entity';
import { ExhibitionDTO } from 'src/exhibition/exhibition.dto';
import { Exhibition } from 'src/exhibition/exhibition.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ExhibitionArtworkService {
  constructor(
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,

    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>
  ) {}

  async addExhibitionArtwork(exhibitionId: number, artworkId: number): Promise<ExhibitionDTO> {
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
    
    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND);

    exhibition.artworks = [...exhibition.artworks, artwork];
    return await this.exhibitionRepository.save(exhibition);
  }

  async findArtworkByExhibitionIdArtworkId(artworkId: number, exhibitionId: number): Promise<ArtworkDTO> {
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

  async findArtworksByExhibitionId(exhibitionId: number): Promise<ArtworkDTO[]> {
    const exhibition: Exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    return exhibition.artworks.filter(p => p.constructor.name === "Artwork")
  }

  async associateExhibitionArtwork(exhibitionId: number, artworkDTO: ArtworkDTO[]): Promise<ExhibitionDTO> {
    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations : ["artworks"] });

    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    let artworks: Artwork[] = [];

    for (let i = 0; i < artworkDTO.length; i++) {
      const artwork = await this.artworkRepository.findOne(artworkDTO[i].id);
      if (!artwork)
        throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND)
      else 
        artworks.push(artwork);
    }

    exhibition.artworks = artworks;
    return await this.exhibitionRepository.save(exhibition);
  }

  async deleteArtworkToExhibition(artworkId: number, exhibitionId: number): Promise<ExhibitionDTO> {
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
