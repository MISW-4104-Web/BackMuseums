import { Test, TestingModule } from '@nestjs/testing';
import { ArtistService } from './artist.service';
import { TypeOrmSQLITETestingModule } from '../test-utils/typeorm-testing'
import { testDatasetSeed } from '../test-utils/test-dataset-seed';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

describe('ArtistService', () => {
  let service: ArtistService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [ArtistService],  
    }).compile();

    service = module.get<ArtistService>(ArtistService);
    await testDatasetSeed();
  });
 

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all artists', async () => {
    const artists = await service.findAll();  
    expect(artists).toHaveLength(1)
  });

  it('should return exception when get an invalid artist', async () => {
    await expect(() => service.findOne(0)).rejects.toHaveProperty("message", "The artist with the given id was not found")
  });
});
