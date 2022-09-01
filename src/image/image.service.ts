import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ImageEntity } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async findAll(): Promise<ImageEntity[]> {
    return await this.imageRepository.find();
  }

  async findOne(imageId: number): Promise<ImageEntity> {
    const image = await this.imageRepository.findOne(imageId);
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
    
    return image;
  }

  async create(image: ImageEntity): Promise<ImageEntity> {
    return await this.imageRepository.save(image);
  }

  async update(imageId: number, imageEntity: ImageEntity): Promise<ImageEntity> {
    const image = await this.imageRepository.findOne(imageId);
    if (!image)
    throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
    
    return await this.imageRepository.save({...image, ...imageEntity});
  }

  async delete(imageId: number) {
    const image = await this.imageRepository.findOne(imageId);
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
    
    return await this.imageRepository.remove(image);
  }
}
