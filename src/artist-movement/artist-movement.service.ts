import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { MovementEntity } from 'src/movement/movement.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistMovementService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,

    @InjectRepository(MovementEntity)
    private readonly movementRepository: Repository<MovementEntity>
  ) {}

  async addMovementToArtist(artistId: number, movementId: number): Promise<ArtistEntity> {
    const movement = await this.movementRepository.findOne(movementId);
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND);
    
    const artist = await this.artistRepository.findOne(artistId, { relations : ["movements"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);

    artist.movements = [...artist.movements, movement];
    return await this.artistRepository.save(artist);
  }

  async findMovementByArtist(movementId: number, artistId: number): Promise<MovementEntity> {
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

  async findMovementsByArtist(artistId: number): Promise<MovementEntity[]> {
    const artist: ArtistEntity = await this.artistRepository.findOne(artistId, { relations : ["movements"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

    return artist.movements
  }

  async updateMovementsFromArtist(artistId: number, movements: MovementEntity[]): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne(artistId, { relations : ["movements"] });

    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

    for(let movementEntity of movements){
      const movement = await this.movementRepository.findOne(movementEntity.id);
      if (!movement)
        throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)
    }

    artist.movements = movements;
    return await this.artistRepository.save(artist);
  }

  async deleteMovementFromArtist(movementId: number, artistId: number) {
    const movement = await this.movementRepository.findOne(movementId);
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    const artist = await this.artistRepository.findOne(artistId, { relations : ["movements"] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

    artist.movements = artist.movements.filter(e => e.id !== movementId);
    await this.artistRepository.save(artist);
  }
}
