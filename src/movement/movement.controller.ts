import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/interceptors/interceptor';
import { MovementDTO } from './movement.dto';
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
  @HttpCode(200)
  async create(@Body() movementDTO: MovementDTO) {
    return await this.movementService.create(movementDTO);
  }

  @Put(':movementId')
  async update(@Param('movementId') movementId: number, @Body() movementDTO: MovementDTO) {
    return await this.movementService.update(movementId, movementDTO);
  }

  @Delete(':movementId')
  @HttpCode(204)
  async delete(@Param('movementId') movementId: number) {
    return await this.movementService.delete(movementId);
  }
}
