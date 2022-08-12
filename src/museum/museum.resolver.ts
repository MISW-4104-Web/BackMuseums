import { Query, Resolver } from '@nestjs/graphql';
import { MuseumService } from './museum.service';
import { Museum } from './museum.entity';

@Resolver()
export class MuseumResolver {
    constructor(private museumService: MuseumService) {}

    @Query(returns => [Museum])
    museums(): Promise<Museum[]> {
        return this.museumService.findAll();
    }
    
}
