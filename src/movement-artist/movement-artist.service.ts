import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/artist.entity';
import { MovementEntity } from 'src/movement/movement.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class MovementArtistService {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly movementRepository: Repository<MovementEntity>,

    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>
  ) {}

  async addMovementArtist(movementId: number, artistId: number): Promise<MovementEntity> {
    const artist = await this.artistRepository.findOne(artistId);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
    
    const movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND);

    movement.artists = [...movement.artists, artist];
    return await this.movementRepository.save(movement);
  }

  async findArtistFromMovement(movementId: number, artistId: number): Promise<ArtistEntity> {
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

  async findArtistsFromMovement(movementId: number): Promise<ArtistEntity[]> {
    const movement: MovementEntity = await this.movementRepository.findOne(movementId, { relations : ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    return movement.artists
  }

  async updateArtistsFromMovement(movementId: number, artists: ArtistEntity[]): Promise<MovementEntity> {
    const movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });

    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    for(let artistEntity of artists) {
      const artist = await this.artistRepository.findOne(artistEntity.id);
      if (!artist) 
        throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND) 
    }

    movement.artists = artists;
    return await this.movementRepository.save(movement);
  }

  async deleteArtistFromMovement(movementId: number, artistId: number) {
    const artist = await this.artistRepository.findOne(artistId);
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND)

    const movement = await this.movementRepository.findOne(movementId, { relations : ["artists"] });
    if (!movement)
      throw new BusinessLogicException("The movement with the given id was not found", BusinessError.NOT_FOUND)

    movement.artists = movement.artists.filter(e => e.id !== artistId);
    await this.movementRepository.save(movement);
  }
}
