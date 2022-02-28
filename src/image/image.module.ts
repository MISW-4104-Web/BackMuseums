/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    controllers: [],
    providers: [],
})
export class ImageModule {}
