import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExhibitionEntity } from 'src/exhibition/exhibition.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { SponsorDTO } from './sponsor.dto';
import { Sponsor } from './sponsor.entity';

@Injectable()
export class SponsorService {
  constructor(
    @InjectRepository(Sponsor)
    private readonly sponsorRepository: Repository<Sponsor>,
    @InjectRepository(ExhibitionEntity)
    private readonly exhibitionRepository: Repository<ExhibitionEntity>
  ) {}

  async findAll(): Promise<SponsorDTO[]> {
    return await this.sponsorRepository.find({ relations: ["exhibition"] });
  }

  async findOne(id: number): Promise<SponsorDTO> {
    const sponsor = await this.sponsorRepository.findOne(id, { relations: ["exhibition"] });
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND)
    else
      return sponsor;
  }

  async create(sponsorDTO: SponsorDTO): Promise<SponsorDTO> {
    const sponsor = new Sponsor();
    sponsor.name = sponsorDTO.name;
    sponsor.description = sponsorDTO.description;
    sponsor.website = sponsorDTO.website;
    return await this.sponsorRepository.save(sponsor);
  }

  async update(id: number, sponsorDTO: SponsorDTO): Promise<SponsorDTO> {
    const sponsor = await this.sponsorRepository.findOne(id);
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND)
  
    sponsor.name = sponsorDTO.name;
    sponsor.description = sponsorDTO.description;
    sponsor.website = sponsorDTO.website;

    await this.sponsorRepository.save(sponsor);
    return sponsor;
  }

  async delete(id: number) {
    const sponsor = await this.sponsorRepository.findOne(id);
    if (!sponsor)
      throw new BusinessLogicException("The sponsor with the given id was not found", BusinessError.NOT_FOUND)
    else
      return await this.sponsorRepository.remove(sponsor);
  }
}
