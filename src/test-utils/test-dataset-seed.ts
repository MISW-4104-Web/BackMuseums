import { Artist } from '../artist/artist.entity';
import { getConnection } from 'typeorm';

export const testDatasetSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  entityManager.clear<Artist>(Artist);

  const artist = await entityManager.insert<Artist>(Artist, {
    name: "moa",
    birthplace: "place",
    birthdate: new Date(),
    image: "image"
  });

  console.log("ART", artist.generatedMaps[0].id)

};