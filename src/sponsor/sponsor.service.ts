import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { SponsorEntity } from './sponsor.entity';

@Injectable()
export class SponsorService {
  constructor(
    @InjectRepository(SponsorEntity)
    private readonly sponsorRepository: Repository<SponsorEntity>,
    @InjectRepository(ExhibitionEntity)
    private readonly exhibitionRepository: Repository<ExhibitionEntity>
  ) {}

  async findAll(): Promise<SponsorEntity[]> {
    return await this.sponsorRepository.find({ relations: ["exhibition"] });
  }

  async findOne(id: number): Promise<SponsorEntity> {
    const sponsor = await this.sponsorRepository.findOne(id, { relations: ["exhibition"] });
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND)
    
    return sponsor;
  }

  async create(sponsorEntity: SponsorEntity): Promise<SponsorEntity> {
    return await this.sponsorRepository.save(sponsorEntity);
  }

  async update(id: number, sponsorEntity: SponsorEntity): Promise<SponsorEntity> {
    const sponsor = await this.sponsorRepository.findOne(id);
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND)
  
    return await this.sponsorRepository.save({...sponsor, ...sponsorEntity});
  }

  async delete(id: number) {
    const sponsor = await this.sponsorRepository.findOne(id);
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND)
    
    return await this.sponsorRepository.remove(sponsor);
  }
}
