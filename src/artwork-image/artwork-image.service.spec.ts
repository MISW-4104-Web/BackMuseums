import { Test, TestingModule } from '@nestjs/testing';
import { ArtworkImageService } from './artwork-image.service';

describe('ArtworkImageService', () => {
  let service: ArtworkImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtworkImageService],
    }).compile();

    service = module.get<ArtworkImageService>(ArtworkImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
