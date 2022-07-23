import { Test, TestingModule } from '@nestjs/testing';
import { ArtistService } from './artist.service';
import { getRepository, Repository } from "typeorm";
import { Artist } from './artist.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ArtistService', () => {
  let service: ArtistService;
  let repository = new Repository<Artist>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistService,
        {
          useClass: Repository,
          provide: getRepositoryToken(Artist)
        }
      ],
    }).compile();

    service = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
