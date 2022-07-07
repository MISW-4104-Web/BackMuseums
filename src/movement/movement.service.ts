import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MovementDTO } from './movement.dto';
import { Movement } from './movement.entity';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>
  ) {}

  async findAll(): Promise<MovementDTO[]> {
    return await this.movementRepository.find();
  }

  async findOne(id: string): Promise<MovementDTO> {
    const movement = await this.movementRepository.findOne(id, { relations: ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)
    else
      return movement;
  }

  async create(movementDTO: MovementDTO): Promise<MovementDTO> {
    const movement = new Movement();
    movement.name = movementDTO.name;
    movement.description = movementDTO.description;
    movement.countryOfOrigin = movementDTO.countryOfOrigin;
    
    return await this.movementRepository.save(movement);
  }

  async update(id: string, movementDTO: MovementDTO): Promise<MovementDTO> {
    const movement = await this.movementRepository.findOne(id);
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)
    else {
      movement.name = movementDTO.name;
      movement.description = movementDTO.description;
      movement.countryOfOrigin = movementDTO.countryOfOrigin;
      
      await this.movementRepository.save(movement);
      return movement;
    }
  }

  async delete(id: string) {
    const movement = await this.movementRepository.findOne(id);
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)
    else
      return await this.movementRepository.remove(movement);
  }
}
