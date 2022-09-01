import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MovementEntity } from './movement.entity';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly movementRepository: Repository<MovementEntity>
  ) {}

  async findAll(): Promise<MovementEntity[]> {
    return await this.movementRepository.find({relations: ["artists"]});
  }

  async findOne(id: number): Promise<MovementEntity> {
    const movement = await this.movementRepository.findOne(id, { relations: ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)
    else
      return movement;
  }

  async create(movementEntity: MovementEntity): Promise<MovementEntity> {
    return await this.movementRepository.save(movementEntity);
  }

  async update(id: number, movementEntity: MovementEntity): Promise<MovementEntity> {
    const movement = await this.movementRepository.findOne(id);
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)
      
    return await this.movementRepository.save({...movement, ...movementEntity});
  }

  async delete(id: number) {
    const movement = await this.movementRepository.findOne(id);
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)
    else
      return await this.movementRepository.remove(movement);
  }
}
