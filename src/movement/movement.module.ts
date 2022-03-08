import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from './movement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movement])],
    controllers: [MovementController],
    providers: [MovementService],
})
export class MovementModule { }
