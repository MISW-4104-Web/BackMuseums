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

  async addMovementArtist(movementId: string, artistId: string): Promise<MovementDTO> {
    const artist = await this.artistRepository.findOne(artistId);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
    
    const movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND);

    movement.artists = [...movement.artists, artist];
    return await this.movementRepository.save(movement);
  }

  async findArtistByMovementIdArtistId(artistId: string, movementId: string): Promise<ArtistDTO> {
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

  async findArtistsByMovementId(movementId: string): Promise<ArtistDTO[]> {
    const movement: Movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    return movement.artists.filter(p => p.constructor.name === "Artist")
  }

  async associateMovementArtist(movementId: string, artistDTO: ArtistDTO[]): Promise<MovementDTO> {
    const movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });

    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    let artists: Artist[] = [];

    for (let i = 0; i < artistDTO.length; i++) {
      const artist = await this.artistRepository.findOne(artistDTO[i].id);
      if (!artist)
        throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)
      else 
        artists.push(artist);
    }

    movement.artists = artists;
    return await this.movementRepository.save(movement);
  }

  async deleteArtistToMovement(artistId: string, movementId: string): Promise<MovementDTO> {
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
