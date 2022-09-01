import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MuseumEntity } from './museum.entity';

@Injectable()
export class MuseumService {
  constructor(
    @InjectRepository(MuseumEntity)
    private readonly museumRepository: Repository<MuseumEntity>,

    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>
  ) {}

  async findAll(): Promise<MuseumEntity[]> {
    return await this.museumRepository.find({ relations: ["artworks", "exhibitions", "image"] });
  }

  async findOne(id: number): Promise<MuseumEntity> {
    const museum = await this.museumRepository.findOne(id, { relations: ["artworks", "exhibitions", "image"] });
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
    
    return museum;
  }

  async create(museumEntity: MuseumEntity): Promise<MuseumEntity> {
    
    const image = await this.imageRepository.findOne(museumEntity.image.id);
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
    
    museumEntity.image = image;
    return await this.museumRepository.save(museumEntity);
  }

  async update(id: number, museumEntity: MuseumEntity): Promise<MuseumEntity> {

    const image = await this.imageRepository.findOne(museumEntity.image.id);
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)

    const museum = await this.museumRepository.findOne(id);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
    
    return await this.museumRepository.save({...museum, ...museumEntity});
  }

  async delete(id: number) {
    const museum = await this.museumRepository.findOne(id);
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND)
    
    return await this.museumRepository.remove(museum);
  }
}
