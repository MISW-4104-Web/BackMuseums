import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MuseumDTO } from './museum.dto';
import { Museum } from './museum.entity';

@Injectable()
export class MuseumService {
  constructor(
    @InjectRepository(Museum)
    private readonly museumRepository: Repository<Museum>
  ) {}

  async findAll(): Promise<MuseumDTO[]> {
    return await this.museumRepository.find({ relations: ["artworks", "exhibitions"] });
  }

  async findOne(id: number): Promise<MuseumDTO> {
    const museum = await this.museumRepository.findOne(id, { relations: ["artworks", "exhibitions"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
    else
      return museum;
  }

  async create(museumDTO: MuseumDTO): Promise<MuseumDTO> {
    const museum = new Museum();
    museum.name = museumDTO.name;
    museum.description = museumDTO.description;
    museum.address = museumDTO.address;
    museum.city = museumDTO.city;
    museum.image = museumDTO.image;
    return await this.museumRepository.save(museum);
  }

  async update(id: number, museumDTO: MuseumDTO): Promise<MuseumDTO> {
    const museum = await this.museumRepository.findOne(id);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
    
    museum.name = museumDTO.name;
    museum.description = museumDTO.description;
    museum.address = museumDTO.address;
    museum.city = museumDTO.city;
    museum.image = museumDTO.image;

    await this.museumRepository.save(museum);
    return museum;
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
