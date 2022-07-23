import { Test, TestingModule } from '@nestjs/testing';
import { ArtistService } from './artist.service';
import { TypeOrmSQLITETestingModule } from '../test-utils/typeorm-testing'
import { testDatasetSeed } from '../test-utils/test-dataset-seed';

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

  it('should return artist info for findOne', async () => {
    const artists = await service.findAll();  
    expect(artists).toHaveLength(1)
  });
});
