import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Museum } from 'src/museum/museum.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Sponsor } from 'src/sponsor/sponsor.entity';
import { Repository } from 'typeorm';
import { ExhibitionDTO } from './exhibition.dto';
import { Exhibition } from './exhibition.entity';

@Injectable()
export class ExhibitionService {
  constructor(
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Sponsor)
    private readonly sponsorRepository: Repository<Sponsor>,
    @InjectRepository(Museum)
    private readonly museumRepository: Repository<Museum>
  ) {}

  async findAll(museumId: string): Promise<ExhibitionDTO[]> {
    const museum = await this.museumRepository.findOne(museumId, { relations : ['exhibitions', 'exhibitions.sponsor', 'exhibitions.artworks'] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);
    return museum.exhibitions;
  }

  async findOne(museumId: string, exhibitionId: string): Promise<ExhibitionDTO> {
    const museum = await this.museumRepository.findOne(museumId, { relations: ["exhibitions"]});
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    const exhibition = await this.exhibitionRepository.findOne(exhibitionId, { relations: ["artworks", "sponsor"] });
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)
    
    const exhibitionmuseum = museum.exhibitions.find(e => e.id === exhibition.id);
    if (!exhibitionmuseum)
      throw new BusinessLogicException("The exhibition is not associated to the museum", BusinessError.NOT_FOUND)

    return exhibition;
  }

  async create(museumId: string, exhibitionDTO: ExhibitionDTO): Promise<ExhibitionDTO> {
    if (exhibitionDTO.sponsor == null)
      throw new BusinessLogicException("The exhibition must have a sponsor association", BusinessError.PRECONDITION_FAILED);

    const sponsor = await this.sponsorRepository.findOne(exhibitionDTO.sponsor.id);
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND);
    
    const museum = await this.museumRepository.findOne(museumId);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    const exhibition = new Exhibition();
    exhibition.name = exhibitionDTO.name;
    exhibition.description = exhibitionDTO.description;
    exhibition.sponsor = sponsor;
    exhibition.museum = museum;
    return await this.exhibitionRepository.save(exhibition);
  }

  async update(museumId: string, exhibitionId: string, exhibitionDTO: ExhibitionDTO): Promise<ExhibitionDTO> {
    const exhibition = await this.exhibitionRepository.findOne(exhibitionId);
    if (!exhibition)
    throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    if (exhibitionDTO.sponsor == null)
      throw new BusinessLogicException("The exhibition must have a sponsor association", BusinessError.PRECONDITION_FAILED);

    const sponsor = await this.sponsorRepository.findOne(exhibitionDTO.sponsor.id);
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND);
    
    const museum = await this.museumRepository.findOne(museumId);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    exhibition.name = exhibitionDTO.name;
    exhibition.description = exhibitionDTO.description;
    exhibition.sponsor = sponsor;
    exhibition.museum = museum;

    await this.exhibitionRepository.save(exhibition);
    return exhibition;
  }

  async delete(museumId: string, exhibitionId: string) {
    const museum = await this.museumRepository.findOne(museumId, { relations : ['exhibitions'] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    const exhibition = await this.exhibitionRepository.findOne(exhibitionId);
    if (!exhibition)
      throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)
    
    museum.exhibitions = museum.exhibitions.filter(e => e.id !== exhibition.id);
    await this.museumRepository.save(museum);
    return await this.exhibitionRepository.remove(exhibition);
  }
}
