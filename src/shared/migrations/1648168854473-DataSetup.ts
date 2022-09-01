import {MigrationInterface, QueryRunner} from "typeorm";

export class DataSetup1648168854473 implements MigrationInterface {
    migration = `
        -- Clearing existing data
        DELETE FROM public.image_entity;
        DELETE FROM public.artwork_entity;
        DELETE FROM public.movement_entity_artists_artist_entity;
        DELETE FROM public.artist_entity;
        DELETE FROM public.movement_entity;
        DELETE FROM public.exhibition_entity;
        DELETE FROM public.sponsor_entity;
        DELETE FROM public.museum_entity;
        
        -- Inserting images for museums
        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (100, 'https://www.bendigoregion.com.au/sites/default/files/styles/large/public/2019-05/Bendigo%20Art%20Gallery.jpg?itok=mbJ4vxuK', 'image', 300, 300);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (101, 'https://media.cntraveler.com/photos/5dae0325b45cd80008161cf3/master/pass/MOMA-2019_IVRPHOTO-4373_ArtistChoice_HB_007-2-2000x1125.jpg', 'image', 300, 300);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (102, 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Tate_Modern_viewed_from_Thames_Pleasure_Boat_-_geograph.org.uk_-_307445.jpg', 'image', 300, 300);
       
        -- Inserting museums
        INSERT INTO public.museum_entity(
            id, name, description, address, city, "imageId")
            VALUES (100, 'Bendigo Art Gallery', 'Located in Bendigo, Victoria, we are one of the oldest and largest regional galleries in Australia. Our collection is extensive, with an emphasis on 19th century European art and Australian art from the 1800s, alongside a strong collection of contemporary Australian art.\nOver the last decade, we have cemented a reputation for presenting innovative international exhibitions alongside a dynamic and varied suite of public programs and events.', '42 View Street', 'Bendigo', 100);
        
        INSERT INTO public.museum_entity(
            id, name, description, address, city, "imageId")
            VALUES (101, 'Museum of Modern Art', 'At The Museum of Modern Art and MoMA PS1, we celebrate creativity, openness, tolerance, and generosity. We aim to be inclusive places— both onsite and online—where diverse cultural, artistic, social, and political positions are welcome. We''re committed to sharing the most thought-provoking modern and contemporary art, and hope you will join us in exploring the art, ideas, and issues of our time.', '11 West 53 Street, Manhattan', 'New York City', 101);
        
        INSERT INTO public.museum_entity(
            id, name, description, address, city,  "imageId")
            VALUES (102, 'Tate Modern', 'Our mission is to increase the public''s enjoyment and understanding of British art from the 16th century to the present day and of international modern and contemporary art', 'Bankside, London SE1 9TG', 'London', 102);
        
        -- Inserting sponsors
        INSERT INTO public.sponsor_entity(
            id, name, description, website)
            VALUES (100, 'Creative Victoria', 'We acknowledge the Traditional Owners of the place now called Victoria, and all First Peoples living and working on this land. We celebrate the history and contemporary creativity of the world''s oldest living culture and pay respect to Elders – past, present and future.', 'https://creative.vic.gov.au/');
        
        INSERT INTO public.sponsor_entity(
            id, name, description, website)
            VALUES (101, 'Greater Bendigo', 'The City of Greater Bendigo is located in the centre of Victoria, covering almost 3,000 square kilometres.\nWe have a growing population of more than 110,000, and are the state''s third largest economy base in Victoria. We are a service and infrastructure centre for north central Victoria, and surrounded by 40,000 hectares of regional, state and national parkland.', 'https://www.bendigo.vic.gov.au/');
        
        INSERT INTO public.sponsor_entity(
            id, name, description, website)
            VALUES (102, 'Allianz', 'The Allianz Group is one of the leading integrated financial services providers worldwide. Here you find the company profile, the Allianz fact sheet and further information on business operations.\nOur ambition is to accompany you in life – giving you everything you need to have the courage to go forward. We offer our 100 million customers in more than 70 countries a wide range of products, services, and solutions in insurance and asset management.', 'https://www.allianz.com/en.html');
        
        INSERT INTO public.sponsor_entity(
            id, name, description, website)
            VALUES (103, 'Bank of America', 'Bank of America are a longstanding partner of Tate, having supported a number of exhibitions at both Tate Modern and Tate Britain since 2008. Our partnership stems from a shared belief in the value of art to society. With Bank of America''s support Tate continues to bring world class exhibitions and the work of a diverse and seminal artists to our audiences.', 'https://www.bankofamerica.com/');
        
        INSERT INTO public.sponsor_entity(
            id, name, description, website)
            VALUES (104, 'EY', 'EY is one of the UK''s longest standing corporate supporters of the arts. We have supported the sector since 1994 and in 2013 we launched the EY Tate Arts Partnership. The partnership extends to all four Tate galleries and includes sponsorship of exhibitions, knowledge and expertise sharing, and memberships with Tate''s national network of museums. This support is designed to drive benefit for our people, our clients and the communities across the country we work within.', 'https://www.ey.com/en_uk/corporate-responsibility/ey-uk-our-sponsorship-of-the-arts');
        
        INSERT INTO public.sponsor_entity(
            id, name, description, website)
            VALUES (105, 'The Huo Family Foundation', 'The Huo Family Foundation is a grant-giving foundation based in London. Its mission is to support education, communities and the pursuit of knowledge.\nThe Foundation’s current focus is in five main areas: education; neuroscience and psychology; public policy; the arts; and Covid-19 research.', 'https://huofamilyfoundation.org/');
        
        -- Inserting exhibitions
        INSERT INTO public.exhibition_entity(
            id, name, description, "museumId", "sponsorId")
            VALUES (100, 'Brett Whiteley: Drawing is Everything', 'At the heart of Brett Whiteley''s extraordinary career was an exceptional talent for drawing.\nDrawing underpinned everything he did – from painting to sculpture to prints – and was fundamental to his imaginative and creative process. Whiteley''s drawing is richly expressive and his bold mastery of line is instantly recognisable. \nThis major exhibition from the Art Gallery of New South Wales is the first to explore the central place of drawing in Whiteley''s practice, featuring rarely seen early works from Sydney and Europe through to the great abstracts that brought Whiteley international fame in the 1960s. Also featured are lyrical landscapes, portraits, interiors and nudes and the iconic imagery of Sydney''s Lavender Bay, offering a journey through the career that established him as one of the most prominent Australian artists of the 20th century.\nDon''t miss this rare opportunity to discover the very foundations of Whiteley''s creativity and process, as showcased in a collection of drawings, paintings, and sculptures suffused with the unmistakable personality of the great Australian master.', 100, 101);
        
        INSERT INTO public.exhibition_entity(
            id, name, description, "museumId", "sponsorId")
            VALUES (101, 'Modern Australia', 'This selection of works from the Gallery''s collection traces the key movements in Modern Australian art and design, and the search for a distinctive Australian visual arts style throughout the mid twentieth century.', 100, 100);
         
        INSERT INTO public.exhibition_entity(
            id, name, description, "museumId", "sponsorId")
            VALUES (102, 'Frédéric Bruly Bouabré: World Unbound', 'The work of the Ivorian artist Frédéric Bruly Bouabré had a single objective: to record and transmit information about the known universe. Devoting his life to a quest for knowledge, Bouabré captured and codified subjects from a range of sources, including cultural traditions, folklore, religious and spiritual belief systems, philosophy, and popular culture. “I do not work from my imagination," he once said. “I observe, and what I see delights me.”', 101, 102);
        
        INSERT INTO public.exhibition_entity(
            id, name, description, "museumId", "sponsorId")
            VALUES (103, 'Cornelia Parker', 'Cornelia Parker is one of Britain''s best loved and most acclaimed contemporary artists. Always driven by curiosity, she reconfigures domestic objects to question our relationship with the world. Using transformation, playfulness and storytelling, she engages with important issues of our time, be it violence, ecology or human rights.\nThe exhibition will bring together such iconic suspended works as Thirty Pieces of Silver 1988–9 and Cold Dark Matter: An Exploded View 1991; the immersive War Room 2015 and Magna Carta 2015, her monumental collective embroidery, as well as her films and a wealth of her innovative drawings, prints and photographs. Some works will spill out beyond the confines of the exhibition and infiltrate the permanent collection, in dialogue with the historical works they reference.', 102, 103);
        
        INSERT INTO public.exhibition_entity(
            id, name, description, "museumId", "sponsorId")
            VALUES (104, 'The EY Exhibition: Cezanne', 'Focusing on the many tensions and contradictions in Cezanne''s work, this exhibition seeks to understand the artist in his own context, as an ambitious young painter proudly from the Mediterranean South, yet eager to make it in metropolitan Paris. Featuring many works shown for the first time in the UK, the show will follow his struggle between seeking official recognition and joining the emerging impressionists before relentlessly pursuing his own unique language. We will witness an artist wrestling with what it means to be a modern painter while remaining deeply sceptical about the world he lived in, from political unrest to a continually accelerating way of life.', 102, 105);
         
        INSERT INTO public.exhibition_entity(
            id, name, description, "museumId", "sponsorId")
            VALUES (105, 'The EY Exhibition: Van Gogh and Britain', 'The EY Exhibition: Van Gogh and Britain presents the largest collection of Van Gogh''s paintings in the UK for nearly a decade. Some of his most famous works will be brought together from around the world – including Shoes, Starry Night over the Rhône, L''Arlésienne, and two works he made while a patient at the Saint-Paul Asylum, At Eternity''s Gate and Prisoners Exercising. They will be joined by the very rarely lent Sunflowers from London''s National Gallery.\nThe exhibition also looks at the British artists who were inspired by Van Gogh, including Francis Bacon, David Bomberg, and the young Camden Town painters. It shows how his vision set British artists on the road to modern art.', 102, 104);
        
        -- Inserting movements
        INSERT INTO public.movement_entity(
            id, name, description, "countryOfOrigin")
            VALUES (100, 'Avant-garde', 'The avant-garde is a person or work that is experimental, radical, or unorthodox with respect to art, culture, or society. It is frequently characterized by aesthetic innovation and initial unacceptability.\nThe avant-garde pushes the boundaries of what is accepted as the norm or the status quo, primarily in the cultural realm. The avant-garde is considered by some to be a hallmark of modernism. Many artists have aligned themselves with the avant-garde movement, and still continue to do so, tracing their history from Dada through the Situationists and to postmodern artists such as the Language poets around 1981.\nThe avant-garde also promotes radical social reforms. This meaning was evoked by the Saint Simonian Olinde Rodrigues in his essay, "L''artiste, le savant et l''industriel" ("The artist, the scientist and the industrialist", 1825). This essay contains the first use of "avant-garde" in its now customary sense; there, Rodrigues called on artists to "serve as [the people''s] avant-garde", insisting that "the power of the arts is indeed the most immediate and fastest way" to social, political and economic reform.', 'France');
        
        INSERT INTO public.movement_entity(
            id, name, description, "countryOfOrigin")
            VALUES (101, 'Post-Impressionism', 'Post-Impressionism (also spelled Postimpressionism) was a predominantly French art movement that developed roughly between 1886 and 1905, from the last Impressionist exhibition to the birth of Fauvism. Post-Impressionism emerged as a reaction against Impressionists'' concern for the naturalistic depiction of light and colour. Due to its broad emphasis on abstract qualities or symbolic content, Post-Impressionism encompasses Les Nabis, Neo-Impressionism, Symbolism, Cloisonnism, Pont-Aven School, as well as Synthetism, along with some later Impressionists'' work. The movement was led by Paul Cézanne (known as the father of Post-Impressionism), Paul Gauguin, Vincent van Gogh and Georges Seurat.\nThe term Post-Impressionism was first used by art critic Roger Fry in 1906. Critic Frank Rutter in a review of the Salon d''Automne published in Art News, 15 October 1910, described Othon Friesz as a "post-impressionist leader"; there was also an advert for the show The Post-Impressionists of France. Three weeks later, Roger Fry used the term again when he organised the 1910 exhibition Manet and the Post-Impressionists, defining it as the development of French art since Manet.\nPost-Impressionists extended Impressionism while rejecting its limitations: they continued using vivid colours, often thick application of paint and real-life subject matter, but were more inclined to emphasize geometric forms, distort form for expressive effect, and use unnatural or arbitrary colour.', 'France');
        
        INSERT INTO public.movement_entity(
            id, name, description, "countryOfOrigin")
            VALUES (102, 'Naive art', 'Naive art could easily be dismissed as art that''s created by people who “don''t know what they’re doing”, but that undermines the raw creativity found within works of the movement and its uninhibited and instinctive approach to materials, composition and ideas.\nBefore the 20th century, in its most basic sense naive art was any form of visual art created by a person who lacked the formal education and training a professional artist undergoes. When a trained artists emulates this aesthetic, it is often referred to as primitivism, pseudo-naive art or faux naive art.', 'France');
        
        INSERT INTO public.movement_entity(
            id, name, description, "countryOfOrigin")
            VALUES (103, 'Conceptual art', 'Conceptual art is art for which the idea (or concept) behind the work is more important than the finished art object. It emerged as an art movement in the 1960s and the term usually refers to art made from the mid-1960s to the mid-1970s. Joseph Kosuth. Clock (One and Five), English/Latin Version (1965)', 'United States of America');
        
        INSERT INTO public.movement_entity(
            id, name, description, "countryOfOrigin")
            VALUES (104, 'Vorticism', 'Vorticism was a London-based modernist art movement formed in 1914 by the writer and artist Wyndham Lewis. The movement was partially inspired by Cubism and was introduced to the public by means of the publication of the Vorticist manifesto in Blast magazine. Familiar forms of representational art were rejected in favour of a geometric style that tended towards a hard-edged abstraction. Lewis proved unable to harness the talents of his disparate group of avant-garde artists; however, for a brief period Vorticism proved to be an exciting intervention and an artistic riposte to Marinetti''s Futurism and the post-impressionism of Roger Fry''s Omega Workshops.\nVorticist paintings emphasised ''modern life'' as an array of bold lines and harsh colours drawing the viewer''s eye into the centre of the canvas and vorticist sculpture created energy and intensity through ''direct carving''.', 'England');

        -- Inserting images for artists
        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (103, 'https://content.api.news/v3/images/bin/6e366e88e44b0777b55a87ea6f2ffbd3', 'image', 300, 300);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (104, 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Grace_Cossington_Smith_Turramurra.jpg', 'image', 300, 300);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (105, 'https://elhombrejazmin.com/wp-content/imagenes/2013/11/frederic_bruly_bouabre.jpg', 'image', 300, 300);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (106, 'https://upload.wikimedia.org/wikipedia/commons/2/28/Cornelia-Parker-010-1.jpg', 'image', 300, 300);

        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (107, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Paul-Cezanne.jpg/220px-Paul-Cezanne.jpg', 'image', 300, 300);
                
        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (108, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/474px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg', 'image', 300, 300);

        INSERT INTO public.image_entity(
            id, source, "altText", height, width)
            VALUES (109, 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Photo_of_Davis_Bomberg.jpg', 'image', 300, 300);


        -- Inserting artists
        INSERT INTO public.artist_entity(
            id, name, birthplace, birthdate,  "imageId")
            VALUES (100, 'Brett Whiteley', 'Sydney, New South Wales, Australia', TO_DATE('07/04/1939', 'DD/MM/YYYY'), 103);
        
        INSERT INTO public.artist_entity(
            id, name, birthplace, birthdate, "imageId")
            VALUES (101, 'Grace Cossington Smith', 'Neutral Bay, New South Wales, Australia', TO_DATE('20/04/1892', 'DD/MM/YYYY'), 104);
        
        INSERT INTO public.artist_entity(
            id, name, birthplace, birthdate, "imageId")
            VALUES (102, 'Frédéric Bruly Bouabré', 'Zépréguhé, Côte d''Ivoire', TO_DATE('11/03/1923', 'DD/MM/YYYY'), 105);
        
        INSERT INTO public.artist_entity(
            id, name, birthplace, birthdate, "imageId")
            VALUES (103, 'Cornelia Parker', 'Cheshire, England', TO_DATE('14/07/1956', 'DD/MM/YYYY'), 106);
        
        INSERT INTO public.artist_entity(
            id, name, birthplace, birthdate, "imageId")
            VALUES (104, 'Paul Cézanne', 'Aix-en-Provence, France', TO_DATE('19/01/1839', 'DD/MM/YYYY'), 107);
        
        INSERT INTO public.artist_entity(
            id, name, birthplace, birthdate, "imageId")
            VALUES (105, 'Vincent van Gogh', 'Zundert, Netherlands', TO_DATE('30/03/1853', 'DD/MM/YYYY'), 108);
        
        INSERT INTO public.artist_entity(
            id, name, birthplace, birthdate, "imageId") 
            VALUES (106, 'David Bomberg', 'Birmingham, England', TO_DATE('05/12/1890', 'DD/MM/YYYY'), 109);
        
        -- Inserting artworks
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (100, 'Dogs', 1975, 'Brett Whiteley felt deeply connected to animals since childhood. In fact, between 1965 and 1988 he staged four exhibitions whose predominant or exclusive subject was animals that he had observed in zoos, domestic environments and in nature.', 'Painting', 100, 100, 100);
        
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (101, 'Self portrait in the studio', 1976, 'Similar to Brett Whiteley''s other major paintings of this period, ''Self-portrait in the studio'' exudes a sense of sumptuous living and the liquid presence of the harbour through what he called ''the ecstasy-like effect of Ultramarine blue''. Whiteley''s tiny mirror self-portrait also reflects the influence of Eastern art in his portrayal of man as merely part of a larger landscape.', 'Painting',  100, 100, 100);
        
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (102, 'Self portrait', 1931, 'Painted in 1948, Cossington Smith''s self-portrait represents her vibrant use of light-infused colour and interest in structure and form. Depicting herself in the prime of her long career, the short brushstrokes, laden with paint, build up a strong colour portrait and capture the dedication she felt towards her art in her intense focused gaze and the determined set of her lips.', 'Painting', 100, 101, 101);
        
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (103, 'Connaissance du monde', 1996, 'In the late 1970s, after decades of making handwritten manuscripts, Bouabré began to draw on found cardboard, combining image and text. From the 1980s onwards, as the scope of his interests grew, he embarked on an all-encompassing project, drawing from observation almost daily. He titled the open-ended series of drawings Connaissance du Monde, and worked on it until his death in 2014, systematically compiling and classifying forms, ideas, and a wide range of phenomena, including domestic objects, cloud formations, and tribal scarifications, as well as the political climate and world events.', 'Painting', 101, 102, 102);
        
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (104, 'Thirty Pieces of Silver', 1989, 'Thirty Pieces of Silver comprises over a thousand flattened silver objects, including plates, spoons, candlesticks, trophies, cigarette cases, teapots and trombones. All the objects were ceremoniously crushed by a steamroller at Cornelia Parker''s request. She then arranged the transformed silver artefacts into thirty disc-shaped groups, which are suspended about a foot from the floor by hundreds of fine wires. Each ''disc'' is approximately ninety centimetres in diameter and they are always hung in orderly rows, although their overall configuration is adapted each time to the space in which the work is displayed. The title refers to the biblical story of how the apostle Judas Iscariot betrayed Jesus in return for thirty pieces of silver.', 'Object', 102, 103, 103);
        
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (105, 'Cold Dark Matter: An Exploded View', 1991, 'Cold Dark Matter: An Exploded View is the restored contents of a garden shed exploded by the British Army at the request of the artist Cornelia Parker. The surviving pieces have been used by Parker to create an installation suspended from the ceiling as if held mid-explosion. Lit by a single lightbulb the fragments cast dramatic shadows on the gallery''s walls.', 'Object', 102, 103, 103);
        
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (106, 'Mont Sainte-Victoire seen from Bellevue', 1887, 'Mont Sainte-Victoire seen from Bellevue, 1885-87 is another panoramic view, of a delicate, tranquil beauty. Admirable is the thought of opposing to the distant landscape the high tree in the foreground, a form through which the near and far, the left and right, become more sharply defined, each with its own mood and dominant. Breadth, height, and depth are almost equally developed; the balance of these dimensions is one of the sources of the fullness and calm of the painting. We experience the vastness of the space in the broad valley with the viaduct; we feel the equivalent depth in the long, endless passage from the house in the foreground to the mountain top; but we also measure the great height of the space in the central tree which spans the whole vertical dimension, crossing every zone of the landscape and reaching from the lower to the upper edge of the canvas.', 'Painting', 102, 104, 104);
        
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (107, 'The Large Bathers', 1906, 'The bathers theme originated in the Renaissance and traditionally showed idealized female bodies in total harmony with nature. Yet Cézanne disturbs this easy relationship here and in his other works on the subject. In this canvas, thick with paint, space is hard to read, and the landscape —note the dead tree branches and ominous clouds—seems harsh and threatening. While he derived many of the figures'' poses from classical statuary, Cézanne overturns tradition as soon as he references it: bodies are deliberately distorted, with obliterated faces, truncated limbs, and uneven flesh.', 'Painting', 102, 104, 104);
        
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (108, 'L''Arlésienne', 1889, 'While in Arles, Van Gogh painted two very similar portraits of Marie Ginoux, the proprietress of the Café de la Gare, wearing the regional costume of the legendary dark-haired beauties of Arles. The first version, which he described in a letter of November 1888 as "an Arlésienne . . . knocked off in one hour," must be the more thinly and summarily executed portrait in the Musée d''Orsay, Paris. In it a parasol and gloves lie on the table instead of books. This portrait belonged to the sitter until she sold it in 1895.', 'Painting', 102, 105, 105);
        
        INSERT INTO public.artwork_entity(
            id, name, year, description, type, "museumId", "exhibitionId", "artistId")
            VALUES (109, 'The Mud Bath', 1914, 'Bathing figures were a traditional way of depicting the nude, but here Bomberg brings the subject into the modern era by basing the scene on steam baths used by the local Jewish population near Bomberg''s home in east London. Bomberg was closely associated with a group of artists known as the vorticists. Their aim was to create art that expressed the modern world through imagery derived from machines and the urban environment. Here Bomberg reduces the human figure to a series of geometric shapes, a process he described as ''searching for an intenser expression … where I use Naturalistic Form I have stripped it of all irrelevant matter.''', 'Painting', 102, 105, 106);
        
        -- Inserting images
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (110, 'https://www.bendigoregion.com.au/sites/default/files/2021-05/brett_whiteley_greg_dogs.jpg', 'Dogs (1)', 889, 1296, 100);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (111, 'shorturl.at/ijzDK', 'Dogs (2)', 509, 742, 100);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (112, 'https://www.bendigoregion.com.au/sites/default/files/2021-05/brett_whiteley_greg_self.jpg', 'Self portrait in the studio (1)', 961, 1229, 101);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (113, 'http://4.bp.blogspot.com/-us2UwO9e6wY/UZeWyY-AnzI/AAAAAAAAQbc/Fic2bNnJK-4/s640/Whiteley,+Brett,+Self-portrait+in+studio+1975-76.jpg', 'Self portrait in the studio (2)', 265, 505, 101);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (114, 'https://www.portrait.gov.au/files/b/b/2/c/i5398.jpg', 'Self portrait (1)', 961, 744, 102);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (115, 'https://www.portrait.gov.au/files/b/b/2/c/i5398-trs.jpg', 'Self portrait (2)', 417, 742, 102);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (116, 'https://universes.art/fileadmin/_processed_/2/b/csm_14_ivory_coast_16b2369926.jpg', 'Connaissance du Monde (1)', 400, 585, 103);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (117, 'https://www.artmajeur.com/medias/standard/f/r/frederic-bruly-bouabre/artwork/12692411_981f68a5-6473-48dc-8efb-8a3c03a287e6.jpg', 'Connaissance du Monde (2)', 649, 525, 103);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (118, 'https://www.tate.org.uk/art/images/work/T/T07/T07461_10.jpg', 'Thirty Pieces of Silver (1)', 611, 742, 104);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (119, 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Thirty_Pieces_of_Silver.jpg', 'Thirty Pieces of Silver (2)', 556, 742, 104);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (120, 'https://media.tate.org.uk/aztate-prd-ew-dg-wgtail-st1-ctr-data/images/.width-1200_LwsaUXy.jpg', 'Cold Dark Matter: An Exploded View (1)', 649, 511, 105);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (121, 'https://chisenhale.org.uk/wp-content/uploads/Cold-Dark-Matter-an-Exploded-View_crop-1361x1080.jpg', 'Cold Dark Matter: An Exploded View (2)', 588, 742, 105);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (122, 'https://upload.wikimedia.org/wikipedia/commons/3/30/Paul_Cezanne_La_Montagne_Saint_Victoire_Barnes.jpg', 'Mont Sainte-Victoire seen from Bellevue (1)', 588, 742, 106);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (123, 'https://www.phaidon.com/resource/cazannemont1.jpg', 'Mont Sainte-Victoire seen from Bellevue (2)', 498, 620, 106);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (124, 'https://i.ytimg.com/vi/8ilh53BJ3qY/maxresdefault.jpg', 'The Large Bathers (1)', 417, 742, 107);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (125, 'https://www.reprodart.com/kunst/paul_cezanne/the-large-bathers.jpg', 'The Large Bathers (2)', 501, 600, 107);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (126, 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436529/795979/main-image', 'L''Arlésienne (1)', 649, 515, 108);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (127, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/LArlesienneWithBooks.jpg/300px-LArlesienneWithBooks.jpg', 'L''Arlésienne (2)', 383, 300, 108);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (128, 'https://www.tate.org.uk/art/images/work/T/T00/T00656_10.jpg', 'The Mud Bath (1)', 509, 742, 109);
        
        INSERT INTO public.image_entity(
            id, source, "altText", height, width, "artworkId")
            VALUES (129, 'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Bomberg%2C_The_Mud_Bath.jpg/300px-Bomberg%2C_The_Mud_Bath.jpg', 'The Mud Bath (2)', 201, 300, 109);
        
        -- Associating artists and movements
        INSERT INTO public.movement_entity_artists_artist_entity(
            "movementEntityId", "artistEntityId")
            VALUES (100, 100);
        
        INSERT INTO public.movement_entity_artists_artist_entity(
            "movementEntityId", "artistEntityId")
            VALUES (100, 101);
        
        INSERT INTO public.movement_entity_artists_artist_entity( 
            "movementEntityId", "artistEntityId")
            VALUES (100, 106);
        
        INSERT INTO public.movement_entity_artists_artist_entity(
            "movementEntityId", "artistEntityId")
            VALUES (101, 101);
        
        INSERT INTO public.movement_entity_artists_artist_entity(
            "movementEntityId", "artistEntityId")
            VALUES (101, 104);
        
        INSERT INTO public.movement_entity_artists_artist_entity(
            "movementEntityId", "artistEntityId")
            VALUES (101, 105);
        
        INSERT INTO public.movement_entity_artists_artist_entity(
            "movementEntityId", "artistEntityId")
            VALUES (102, 102);
        
        INSERT INTO public.movement_entity_artists_artist_entity(
            "movementEntityId", "artistEntityId")
            VALUES (103, 103);
        
        INSERT INTO public.movement_entity_artists_artist_entity(
            "movementEntityId", "artistEntityId")
            VALUES (104, 106);
    `;

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(this.migration);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
