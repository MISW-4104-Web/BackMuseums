import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtworkEntity } from 'src/artwork/artwork.entity';
import { ImageEntity } from 'src/image/image.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ArtworkImageService {
    constructor(
        @InjectRepository(ArtworkEntity)
        private readonly artworkRepository: Repository<ArtworkEntity>,

        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
    ) { }

    async findImagesFromArtwork(artworkId: number): Promise<ImageEntity[]> {
        const artwork = await this.artworkRepository.findOne(artworkId, { relations: ['images'] });
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
        return artwork.images;
    }

    async findImageFromArtwork(artworkId: number, imageId: number): Promise<ImageEntity> {
        const artwork = await this.artworkRepository.findOne(artworkId, { relations: ['images'] });
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);

        const image = await this.imageRepository.findOne(imageId, { relations: ["artworks"] });
        if (!image)
            throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND);

        const artworkimage = artwork.images.find(i => i.id === imageId);
        if (!artworkimage)
            throw new BusinessLogicException("The image is not associated to the image", BusinessError.NOT_FOUND)

        return image;
    }

    async addImageToArtwork(artworkId: number, imageId: number): Promise<ArtworkEntity> {
        const artwork = await this.artworkRepository.findOne(artworkId, {relations: ["images"]});
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);

        const image = await this.imageRepository.findOne(imageId);
        if (!image)
            throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND);
        
        artwork.images = [...artwork.images, image]
        
        return await this.artworkRepository.save(artwork);
    }

    
    async updateImagesFromArtwork(artworkId: number, images: ImageEntity[]): Promise<ImageEntity[]> {
        const artwork = await this.artworkRepository.findOne(artworkId);
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);

        const updatedImages: ImageEntity[] = [];
        
        for(let imageEntity of images){
            const image = await this.imageRepository.findOne(imageEntity.id);
            if (!image)
                throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)    
            image.artwork = artwork;
            updatedImages.push(await this.imageRepository.save(image));
        } 
         
        return updatedImages;
    }

    async deleteImageFromArtwork(artworkId: number, imageId: number) {
        const artwork = await this.artworkRepository.findOne(artworkId, {relations: ["images"]});
        if (!artwork)
            throw new BusinessLogicException("The artwork with the given id was not found", BusinessError.NOT_FOUND);
        
        const image = await this.imageRepository.findOne(imageId, { relations: ['artwork'] });
        if (!image)
            throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)

        artwork.images = artwork.images.filter(i => i.id !== image.id);
        await this.artworkRepository.save(artwork);
    }
}
