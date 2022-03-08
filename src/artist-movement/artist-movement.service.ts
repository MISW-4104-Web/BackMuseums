/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistDTO } from 'src/artist/artist.dto';
import { Artist } from 'src/artist/artist.entity';
import { MovementDTO } from 'src/movement/movement.dto';
import { Movement } from 'src/movement/movement.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistMovementService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>
  ) {}

  async addArtistMovement(artistId: number, movementId: number): Promise<ArtistDTO> {
    const movement = await this.movementRepository.findOne(movementId);
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND);
    
    const artist = await this.artistRepository.findOne(artistId, { relations : ["movements"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);

    artist.movements = [...artist.movements, movement];
    return await this.artistRepository.save(artist);
  }

  async findMovementByArtistIdMovementId(movementId: number, artistId: number): Promise<MovementDTO> {
    const movement = await this.movementRepository.findOne(movementId);
      if (!movement)
        throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)
      
      const artist = await this.artistRepository.findOne(artistId, { relations : ["movements"] });
      if (!artist)
        throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

      const artistMovement = artist.movements.find(e => e.id === movement.id);

      if (!artistMovement)
        throw new BusinessLogicException("The movement with the given id is not associated to the artist", BusinessError.PRECONDITION_FAILED)

      return artistMovement;
  }

  async findMovementsByArtistId(artistId: number): Promise<MovementDTO[]> {
    const artist: Artist = await this.artistRepository.findOne(artistId, { relations : ["movements"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

    return artist.movements.filter(p => p.constructor.name === "Movement")
  }

  async associateArtistMovement(artistId: number, movementDTO: MovementDTO[]): Promise<ArtistDTO> {
    const artist = await this.artistRepository.findOne(artistId, { relations : ["movements"] });

    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

    let movements: Movement[] = [];

    for (let i = 0; i < movementDTO.length; i++) {
      const movement = await this.movementRepository.findOne(movementDTO[i].id);
      if (!movement)
        throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)
      else 
        movements.push(movement);
    }

    artist.movements = movements;
    return await this.artistRepository.save(artist);
  }

  async deleteMovementToArtist(movementId: number, artistId: number): Promise<ArtistDTO> {
    const movement = await this.movementRepository.findOne(movementId);
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    const artist = await this.artistRepository.findOne(artistId, { relations : ["movements"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

    artist.movements = artist.movements.filter(e => e.id !== movementId);
    return await this.artistRepository.save(artist);
}



}
