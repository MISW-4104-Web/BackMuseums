/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibition } from './exhibition.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Exhibition])],
    controllers: [],
    providers: [],
})
export class ExhibitionModule { }
