/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistDTO } from 'src/artist/artist.dto';
import { Artist } from 'src/artist/artist.entity';
import { MovementDTO } from 'src/movement/movement.dto';
import { Movement } from 'src/movement/movement.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class MovementArtistService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,

    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) {}

  async addMovementArtist(movementId: number, artistId: number): Promise<MovementDTO> {
    const artist = await this.artistRepository.findOne(artistId);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
    
    const movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND);

    movement.artists = [...movement.artists, artist];
    return await this.movementRepository.save(movement);
  }

  async findArtistByMovementIdArtistId(artistId: number, movementId: number): Promise<ArtistDTO> {
    const artist = await this.artistRepository.findOne(artistId);
      if (!artist)
        throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
      
      const movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });
      if (!movement)
        throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

      const movementArtist = movement.artists.find(e => e.id === artist.id);

      if (!movementArtist)
        throw new BusinessLogicException("The artist with the given id is not associated to the movement", BusinessError.PRECONDITION_FAILED)

      return movementArtist;
  }

  async findArtistsByMovementId(movementId: number): Promise<ArtistDTO[]> {
    const movement: Movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    return movement.artists.filter(p => p.constructor.name === "Artist")
  }

  async associateMovementArtist(movementId: number, artists: Artist[]): Promise<MovementDTO> {
    const movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });

    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    artists.forEach(async artistEntity => {
      const artist = await this.artistRepository.findOne(artistEntity.id);
      if (!artist)
        throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
    })

    movement.artists = artists;
    return await this.movementRepository.save(movement);
  }

  async deleteArtistToMovement(artistId: number, movementId: number): Promise<MovementDTO> {
    const artist = await this.artistRepository.findOne(artistId);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

    const movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    movement.artists = movement.artists.filter(e => e.id !== artistId);
    return await this.movementRepository.save(movement);
  }
}
