import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MuseumService } from './museum.service';
import { Museum } from './museum.entity';
import { MuseumDTO } from './museum.dto';

@Resolver()
export class MuseumResolver {
    constructor(private museumService: MuseumService) {}

    @Query(returns => [Museum])
    museums(): Promise<Museum[]> {
        return this.museumService.findAll();
    }

    @Query(returns => Museum)
    museum(@Args('id') id: string): Promise<Museum> {
        return this.museumService.findOne(id);
    }

    @Mutation(returns => Museum)
    createMuseum(@Args('museum') museum: MuseumDTO): Promise<Museum> {
        return this.museumService.create(museum);
    }

    @Mutation(returns => Museum)
    updateMuseum(@Args('id') id: string, @Args('museum') museum: MuseumDTO): Promise<Museum> {
        return this.museumService.update(id, museum);
    }

    @Mutation(returns => Museum)
    deleteMuseum(@Args('id') id: string): Promise<Museum> {
        return this.museumService.delete(id);
    }
}
/* archivo: src/museum/museum.resolver.ts */