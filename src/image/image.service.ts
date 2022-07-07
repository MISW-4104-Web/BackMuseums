import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Artwork } from 'src/artwork/artwork.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ImageDTO } from './image.dto';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) {}

  async findAll(artistId: string, artworkId: string): Promise<ImageDTO[]> {
    const artist = await this.artistRepository.findOne(artistId, { relations : ['artworks'] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
    
    const artwork = await this.artworkRepository.findOne(artworkId, { relations : ['images'] });
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
    
    return artwork.images;
  }

  async findOne(artistId: string, artworkId: string, imageId: string): Promise<ImageDTO> {
    const artist = await this.artistRepository.findOne(artistId, { relations : ['artworks'] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
    
    const artwork = await this.artworkRepository.findOne(artworkId, { relations: ["images"] });
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);

    const image = await this.imageRepository.findOne(imageId, { relations: ["artwork"] });
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
    
    const imageartwork = artwork.images.find(e => e.id === image.id);
    if (!imageartwork)
      throw new BusinessLogicException("The image is not associated to the artwork", BusinessError.NOT_FOUND)

    return imageartwork;

  }

  async create(artistId: string, artworkId: string, imageDTO: ImageDTO): Promise<ImageDTO> {
    /*if (imageDTO.artwork == null)
      throw new BusinessLogicException("The image must have a artwork association", BusinessError.PRECONDITION_FAILED);*/

    const artist = await this.artistRepository.findOne(artistId, { relations : ['artworks'] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
      
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);

    const image = new Image();
    image.source = imageDTO.source;
    image.altText = imageDTO.altText;
    image.height = imageDTO.height;
    image.width = imageDTO.width;
    image.artwork = artwork;
    return await this.imageRepository.save(image);
  }

  async update(artistId: string, artworkId: string, imageId: string, imageDTO: ImageDTO): Promise<ImageDTO> {
    const image = await this.imageRepository.findOne(imageId);
    if (!image)
    throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
    
    /*if (imageDTO.artwork == null)
      throw new BusinessLogicException("The image must have a artwork association", BusinessError.PRECONDITION_FAILED);*/

    const artist = await this.artistRepository.findOne(artistId, { relations : ['artworks'] });
    if (!artist)
        throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
      
    const artwork = await this.artworkRepository.findOne(artworkId);
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);

    image.source = imageDTO.source;
    image.altText = imageDTO.altText;
    image.height = imageDTO.height;
    image.width = imageDTO.width;
    image.artwork = artwork;
    
    await this.imageRepository.save(image);
    return image;
  }

  async delete(artistId: string, artworkId: string, imageId: string) {
    const artist = await this.artistRepository.findOne(artistId, { relations : ['artworks'] });
    if (!artist)
      throw new BusinessLogicException("The artist with the given id was not found", BusinessError.NOT_FOUND);
    
    const artwork = await this.artworkRepository.findOne(artworkId, { relations : ['images'] });
    if (!artwork)
      throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);

    const image = await this.imageRepository.findOne(imageId);
    if (!image)
      throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
    
    artwork.images = artwork.images.filter(e => e.id !== image.id);
    await this.artworkRepository.save(artwork);
    return await this.imageRepository.remove(image);
  }
}
