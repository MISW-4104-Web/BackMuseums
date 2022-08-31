import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MuseumEntity } from 'src/museum/museum.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Sponsor } from 'src/sponsor/sponsor.entity';
import { Repository } from 'typeorm';
import { ExhibitionEntity } from './exhibition.entity';

@Injectable()
export class ExhibitionService {
  constructor(
    @InjectRepository(ExhibitionEntity)
    private readonly exhibitionRepository: Repository<ExhibitionEntity>,
    @InjectRepository(Sponsor)
    private readonly sponsorRepository: Repository<Sponsor>,
    @InjectRepository(MuseumEntity)
    private readonly museumRepository: Repository<MuseumEntity>
  ) {}

  async findAll(): Promise<ExhibitionEntity[]> {
    return await this.exhibitionRepository.find();
  }

  async findOne(museumId: number, exhibitionId: number): Promise<ExhibitionEntity> {
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

  async create(museumId: number, exhibition: ExhibitionEntity): Promise<ExhibitionEntity> {
    if (exhibition.sponsor == null)
      throw new BusinessLogicException("The exhibition must have a sponsor association", BusinessError.PRECONDITION_FAILED);

    const sponsor = await this.sponsorRepository.findOne(exhibition.sponsor.id);
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND);
    
    const museum = await this.museumRepository.findOne(museumId);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    return await this.exhibitionRepository.save(exhibition);
  }

  async update(museumId: number, exhibitionId: number, exhibitionEntity: ExhibitionEntity): Promise<ExhibitionEntity> {
    const exhibition = await this.exhibitionRepository.findOne(exhibitionId);
    if (!exhibition)
    throw new BusinessLogicException("The exhibition with the given id was not found", BusinessError.NOT_FOUND)

    if (exhibitionEntity.sponsor == null)
      throw new BusinessLogicException("The exhibition must have a sponsor association", BusinessError.PRECONDITION_FAILED);

    const sponsor = await this.sponsorRepository.findOne(exhibitionEntity.sponsor.id);
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND);
    
    const museum = await this.museumRepository.findOne(museumId);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    exhibitionEntity.id = exhibition.id;

    await this.exhibitionRepository.save(exhibitionEntity);
    return exhibitionEntity;
  }

  async delete(museumId: number, exhibitionId: number) {
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
