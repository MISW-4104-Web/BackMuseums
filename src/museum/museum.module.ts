/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Museum } from './museum.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Museum])],
    controllers: [],
    providers: [],
})
export class MuseumModule { }
