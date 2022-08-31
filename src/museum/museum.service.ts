import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MuseumDto } from './museum.dto';
import { MuseumEntity } from './museum.entity';

@Injectable()
export class MuseumService {
  constructor(
    @InjectRepository(MuseumEntity)
    private readonly museumRepository: Repository<MuseumEntity>
  ) {}

  async findAll(): Promise<MuseumEntity[]> {
    return await this.museumRepository.find({ relations: ["artworks", "exhibitions"] });
  }

  async findOne(id: number): Promise<MuseumEntity> {
    const museum = await this.museumRepository.findOne(id, { relations: ["artworks", "exhibitions"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
    else
      return museum;
  }

  async create(museumEntity: MuseumEntity): Promise<MuseumEntity> {
    return await this.museumRepository.save(museumEntity);
  }

  async update(id: number, museumEntity: MuseumEntity): Promise<MuseumEntity> {
    const museum = await this.museumRepository.findOne(id);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
    
    museumEntity.id = museum.id;
    
    await this.museumRepository.save(museumEntity);
    return museumEntity;
  }

  async delete(id: number) {
    const museum = await this.museumRepository.findOne(id);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
    else {
      return await this.museumRepository.remove(museum);
    }
  }
}
