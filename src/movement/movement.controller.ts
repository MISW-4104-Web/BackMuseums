import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/interceptor';
import { MovementDto } from './movement.dto';
import { MovementEntity } from './movement.entity';
import { MovementService } from './movement.service';

@Controller('movements')
@UseInterceptors(BusinessErrorsInterceptor)
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Get()
  async findAll() {
    return await this.movementService.findAll();
  }

  @Get(':movementId')
  async findOne(@Param('movementId') movementId: number) {
    return await this.movementService.findOne(movementId);
  }

  @Post()
  async create(@Body() movementDto: MovementDto) {
    const movement = plainToInstance(MovementEntity, movementDto);
    return await this.movementService.create(movement);
  }

  @Put(':movementId')
  async update(@Param('movementId') movementId: number, @Body() movementDto: MovementDto) {
    const movement = plainToInstance(MovementEntity, movementDto);
    return await this.movementService.update(movementId, movement);
  }

  @Delete(':movementId')
  @HttpCode(204)
  async delete(@Param('movementId') movementId: number) {
    return await this.movementService.delete(movementId);
  }
}
