import {MigrationInterface, QueryRunner} from "typeorm";

export class DataSetup1648168854473 implements MigrationInterface {
    migration = `
        -- Clearing existing data
        DELETE FROM public.image;
        DELETE FROM public.artwork;
        DELETE FROM public.movement_artists_artist;
        DELETE FROM public.artist;
        DELETE FROM public.movement;
        DELETE FROM public.exhibition;
        DELETE FROM public.sponsor;
        DELETE FROM public.museum;

        -- Inserting museums
        INSERT INTO public.museum(
            id, name, description, address, city, image)
            VALUES ('014419af-333b-4402-bde5-54b336c72038', 'Bendigo Art Gallery', 'Located in Bendigo, Victoria, we are one of the oldest and largest regional galleries in Australia. Our collection is extensive, with an emphasis on 19th century European art and Australian art from the 1800s, alongside a strong collection of contemporary Australian art.\nOver the last decade, we have cemented a reputation for presenting innovative international exhibitions alongside a dynamic and varied suite of public programs and events.', '42 View Street', 'Bendigo', 'https://www.bendigoregion.com.au/sites/default/files/styles/large/public/2019-05/Bendigo%20Art%20Gallery.jpg?itok=mbJ4vxuK');
        --100

        INSERT INTO public.museum(
            id, name, description, address, city, image)
            VALUES ('3b06296a-e14f-4530-af45-3673e87e54fe', 'Museum of Modern Art', 'At The Museum of Modern Art and MoMA PS1, we celebrate creativity, openness, tolerance, and generosity. We aim to be inclusive places— both onsite and online—where diverse cultural, artistic, social, and political positions are welcome. We''re committed to sharing the most thought-provoking modern and contemporary art, and hope you will join us in exploring the art, ideas, and issues of our time.', '11 West 53 Street, Manhattan', 'New York City', 'https://media.cntraveler.com/photos/5dae0325b45cd80008161cf3/master/pass/MOMA-2019_IVRPHOTO-4373_ArtistChoice_HB_007-2-2000x1125.jpg');
        --101

        INSERT INTO public.museum(
            id, name, description, address, city, image)
            VALUES ('a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', 'Tate Modern', 'Our mission is to increase the public''s enjoyment and understanding of British art from the 16th century to the present day and of international modern and contemporary art', 'Bankside, London SE1 9TG', 'London', 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Tate_Modern_viewed_from_Thames_Pleasure_Boat_-_geograph.org.uk_-_307445.jpg');
        --102

        -- Inserting sponsors
        INSERT INTO public.sponsor(
            id, name, description, website)
            VALUES ('b8f3e0fc-4ae1-45e9-a175-adb91f4352e3', 'Creative Victoria', 'We acknowledge the Traditional Owners of the place now called Victoria, and all First Peoples living and working on this land. We celebrate the history and contemporary creativity of the world''s oldest living culture and pay respect to Elders – past, present and future.', 'https://creative.vic.gov.au/');
        --100

        INSERT INTO public.sponsor(
            id, name, description, website)
            VALUES ('13ce1672-de15-46f8-b547-ed7c9791d442', 'Greater Bendigo', 'The City of Greater Bendigo is located in the centre of Victoria, covering almost 3,000 square kilometres.\nWe have a growing population of more than 110,000, and are the state''s third largest economy base in Victoria. We are a service and infrastructure centre for north central Victoria, and surrounded by 40,000 hectares of regional, state and national parkland.', 'https://www.bendigo.vic.gov.au/');
        --101

        INSERT INTO public.sponsor(
            id, name, description, website)
            VALUES ('9ed54d57-24ef-440e-9163-85f942eac825', 'Allianz', 'The Allianz Group is one of the leading integrated financial services providers worldwide. Here you find the company profile, the Allianz fact sheet and further information on business operations.\nOur ambition is to accompany you in life – giving you everything you need to have the courage to go forward. We offer our 100 million customers in more than 70 countries a wide range of products, services, and solutions in insurance and asset management.', 'https://www.allianz.com/en.html');
        --102

        INSERT INTO public.sponsor(
            id, name, description, website)
            VALUES ('78dd8278-e15c-45b3-9bdd-f98f0f276f8b', 'Bank of America', 'Bank of America are a longstanding partner of Tate, having supported a number of exhibitions at both Tate Modern and Tate Britain since 2008. Our partnership stems from a shared belief in the value of art to society. With Bank of America''s support Tate continues to bring world class exhibitions and the work of a diverse and seminal artists to our audiences.', 'https://www.bankofamerica.com/');
        --103

        INSERT INTO public.sponsor(
            id, name, description, website)
            VALUES ('bfea1d5b-deef-4cd3-aef4-d4f570672a10', 'EY', 'EY is one of the UK''s longest standing corporate supporters of the arts. We have supported the sector since 1994 and in 2013 we launched the EY Tate Arts Partnership. The partnership extends to all four Tate galleries and includes sponsorship of exhibitions, knowledge and expertise sharing, and memberships with Tate''s national network of museums. This support is designed to drive benefit for our people, our clients and the communities across the country we work within.', 'https://www.ey.com/en_uk/corporate-responsibility/ey-uk-our-sponsorship-of-the-arts');
        --104

        INSERT INTO public.sponsor(
            id, name, description, website)
            VALUES ('fbfc6e5e-47af-429d-9942-e955a4918e40', 'The Huo Family Foundation', 'The Huo Family Foundation is a grant-giving foundation based in London. Its mission is to support education, communities and the pursuit of knowledge.\nThe Foundation’s current focus is in five main areas: education; neuroscience and psychology; public policy; the arts; and Covid-19 research.', 'https://huofamilyfoundation.org/');
        --105

        -- Inserting exhibitions
        INSERT INTO public.exhibition(
            id, name, description, "museumId", "sponsorId")
            VALUES ('cce850bf-1a68-45a1-8084-050e39c20ad4', 'Brett Whiteley: Drawing is Everything', 'At the heart of Brett Whiteley''s extraordinary career was an exceptional talent for drawing.\nDrawing underpinned everything he did – from painting to sculpture to prints – and was fundamental to his imaginative and creative process. Whiteley''s drawing is richly expressive and his bold mastery of line is instantly recognisable. \nThis major exhibition from the Art Gallery of New South Wales is the first to explore the central place of drawing in Whiteley''s practice, featuring rarely seen early works from Sydney and Europe through to the great abstracts that brought Whiteley international fame in the 1960s. Also featured are lyrical landscapes, portraits, interiors and nudes and the iconic imagery of Sydney''s Lavender Bay, offering a journey through the career that established him as one of the most prominent Australian artists of the 20th century.\nDon''t miss this rare opportunity to discover the very foundations of Whiteley''s creativity and process, as showcased in a collection of drawings, paintings, and sculptures suffused with the unmistakable personality of the great Australian master.', '014419af-333b-4402-bde5-54b336c72038', '13ce1672-de15-46f8-b547-ed7c9791d442');
        --100

        INSERT INTO public.exhibition(
            id, name, description, "museumId", "sponsorId")
            VALUES ('64b7dd33-057c-4158-bb99-710ebf36be23', 'Modern Australia', 'This selection of works from the Gallery''s collection traces the key movements in Modern Australian art and design, and the search for a distinctive Australian visual arts style throughout the mid twentieth century.', '014419af-333b-4402-bde5-54b336c72038', 'b8f3e0fc-4ae1-45e9-a175-adb91f4352e3');
        --101

        INSERT INTO public.exhibition(
            id, name, description, "museumId", "sponsorId")
            VALUES ('ac054cd7-1da5-4681-9bf6-1983da7fa8a5', 'Frédéric Bruly Bouabré: World Unbound', 'The work of the Ivorian artist Frédéric Bruly Bouabré had a single objective: to record and transmit information about the known universe. Devoting his life to a quest for knowledge, Bouabré captured and codified subjects from a range of sources, including cultural traditions, folklore, religious and spiritual belief systems, philosophy, and popular culture. “I do not work from my imagination," he once said. “I observe, and what I see delights me.”', '3b06296a-e14f-4530-af45-3673e87e54fe', '9ed54d57-24ef-440e-9163-85f942eac825');
        --102

        INSERT INTO public.exhibition(
            id, name, description, "museumId", "sponsorId")
            VALUES ('a16e74c1-f0bc-4c78-a611-2a8931ea0bc8', 'Cornelia Parker', 'Cornelia Parker is one of Britain''s best loved and most acclaimed contemporary artists. Always driven by curiosity, she reconfigures domestic objects to question our relationship with the world. Using transformation, playfulness and storytelling, she engages with important issues of our time, be it violence, ecology or human rights.\nThe exhibition will bring together such iconic suspended works as Thirty Pieces of Silver 1988–9 and Cold Dark Matter: An Exploded View 1991; the immersive War Room 2015 and Magna Carta 2015, her monumental collective embroidery, as well as her films and a wealth of her innovative drawings, prints and photographs. Some works will spill out beyond the confines of the exhibition and infiltrate the permanent collection, in dialogue with the historical works they reference.', 'a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', '78dd8278-e15c-45b3-9bdd-f98f0f276f8b');
        --103

        INSERT INTO public.exhibition(
            id, name, description, "museumId", "sponsorId")
            VALUES ('f6a16b6a-9fd0-4f23-87f1-2ae2bc796288', 'The EY Exhibition: Cezanne', 'Focusing on the many tensions and contradictions in Cezanne''s work, this exhibition seeks to understand the artist in his own context, as an ambitious young painter proudly from the Mediterranean South, yet eager to make it in metropolitan Paris. Featuring many works shown for the first time in the UK, the show will follow his struggle between seeking official recognition and joining the emerging impressionists before relentlessly pursuing his own unique language. We will witness an artist wrestling with what it means to be a modern painter while remaining deeply sceptical about the world he lived in, from political unrest to a continually accelerating way of life.', 'a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', 'fbfc6e5e-47af-429d-9942-e955a4918e40');
        --104

        INSERT INTO public.exhibition(
            id, name, description, "museumId", "sponsorId")
            VALUES ('9ca0a07b-f0da-4ca9-8d93-6360ca3ffe90', 'The EY Exhibition: Van Gogh and Britain', 'The EY Exhibition: Van Gogh and Britain presents the largest collection of Van Gogh''s paintings in the UK for nearly a decade. Some of his most famous works will be brought together from around the world – including Shoes, Starry Night over the Rhône, L''Arlésienne, and two works he made while a patient at the Saint-Paul Asylum, At Eternity''s Gate and Prisoners Exercising. They will be joined by the very rarely lent Sunflowers from London''s National Gallery.\nThe exhibition also looks at the British artists who were inspired by Van Gogh, including Francis Bacon, David Bomberg, and the young Camden Town painters. It shows how his vision set British artists on the road to modern art.', 'a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', 'bfea1d5b-deef-4cd3-aef4-d4f570672a10');
        --105

        -- Inserting movements
        INSERT INTO public.movement(
            id, name, description, "countryOfOrigin")
            VALUES ('d6456889-1fdc-42e9-ac9a-cd60cd44bc26', 'Avant-garde', 'The avant-garde is a person or work that is experimental, radical, or unorthodox with respect to art, culture, or society. It is frequently characterized by aesthetic innovation and initial unacceptability.\nThe avant-garde pushes the boundaries of what is accepted as the norm or the status quo, primarily in the cultural realm. The avant-garde is considered by some to be a hallmark of modernism. Many artists have aligned themselves with the avant-garde movement, and still continue to do so, tracing their history from Dada through the Situationists and to postmodern artists such as the Language poets around 1981.\nThe avant-garde also promotes radical social reforms. This meaning was evoked by the Saint Simonian Olinde Rodrigues in his essay, "L''artiste, le savant et l''industriel" ("The artist, the scientist and the industrialist", 1825). This essay contains the first use of "avant-garde" in its now customary sense; there, Rodrigues called on artists to "serve as [the people''s] avant-garde", insisting that "the power of the arts is indeed the most immediate and fastest way" to social, political and economic reform.', 'France');
        --100

        INSERT INTO public.movement(
            id, name, description, "countryOfOrigin")
            VALUES ('8bd9bc35-19f4-4645-90bd-c914c67cd0b3', 'Post-Impressionism', 'Post-Impressionism (also spelled Postimpressionism) was a predominantly French art movement that developed roughly between 1886 and 1905, from the last Impressionist exhibition to the birth of Fauvism. Post-Impressionism emerged as a reaction against Impressionists'' concern for the naturalistic depiction of light and colour. Due to its broad emphasis on abstract qualities or symbolic content, Post-Impressionism encompasses Les Nabis, Neo-Impressionism, Symbolism, Cloisonnism, Pont-Aven School, as well as Synthetism, along with some later Impressionists'' work. The movement was led by Paul Cézanne (known as the father of Post-Impressionism), Paul Gauguin, Vincent van Gogh and Georges Seurat.\nThe term Post-Impressionism was first used by art critic Roger Fry in 1906. Critic Frank Rutter in a review of the Salon d''Automne published in Art News, 15 October 1910, described Othon Friesz as a "post-impressionist leader"; there was also an advert for the show The Post-Impressionists of France. Three weeks later, Roger Fry used the term again when he organised the 1910 exhibition Manet and the Post-Impressionists, defining it as the development of French art since Manet.\nPost-Impressionists extended Impressionism while rejecting its limitations: they continued using vivid colours, often thick application of paint and real-life subject matter, but were more inclined to emphasize geometric forms, distort form for expressive effect, and use unnatural or arbitrary colour.', 'France');
        --101

        INSERT INTO public.movement(
            id, name, description, "countryOfOrigin")
            VALUES ('db49a014-a820-48e0-9a67-ea7fd7f69a6b', 'Naive art', 'Naive art could easily be dismissed as art that''s created by people who “don''t know what they’re doing”, but that undermines the raw creativity found within works of the movement and its uninhibited and instinctive approach to materials, composition and ideas.\nBefore the 20th century, in its most basic sense naive art was any form of visual art created by a person who lacked the formal education and training a professional artist undergoes. When a trained artists emulates this aesthetic, it is often referred to as primitivism, pseudo-naive art or faux naive art.', 'France');
        --102

        INSERT INTO public.movement(
            id, name, description, "countryOfOrigin")
            VALUES ('f6893e91-079f-4c80-880c-bbbc163b7eec', 'Conceptual art', 'Conceptual art is art for which the idea (or concept) behind the work is more important than the finished art object. It emerged as an art movement in the 1960s and the term usually refers to art made from the mid-1960s to the mid-1970s. Joseph Kosuth. Clock (One and Five), English/Latin Version (1965)', 'United States of America');
        --103

        INSERT INTO public.movement(
            id, name, description, "countryOfOrigin")
            VALUES ('467c162b-08c2-40c3-831e-c33dd2f46a44', 'Vorticism', 'Vorticism was a London-based modernist art movement formed in 1914 by the writer and artist Wyndham Lewis. The movement was partially inspired by Cubism and was introduced to the public by means of the publication of the Vorticist manifesto in Blast magazine. Familiar forms of representational art were rejected in favour of a geometric style that tended towards a hard-edged abstraction. Lewis proved unable to harness the talents of his disparate group of avant-garde artists; however, for a brief period Vorticism proved to be an exciting intervention and an artistic riposte to Marinetti''s Futurism and the post-impressionism of Roger Fry''s Omega Workshops.\nVorticist paintings emphasised ''modern life'' as an array of bold lines and harsh colours drawing the viewer''s eye into the centre of the canvas and vorticist sculpture created energy and intensity through ''direct carving''.', 'England');
        --104

        -- Inserting artists
        INSERT INTO public.artist(
            id, name, birthplace, birthdate, image)
            VALUES ('521e1598-e8be-4923-875e-5873c94c48e7', 'Brett Whiteley', 'Sydney, New South Wales, Australia', TO_DATE('07/04/1939', 'DD/MM/YYYY'), 'https://content.api.news/v3/images/bin/6e366e88e44b0777b55a87ea6f2ffbd3');
        --100

        INSERT INTO public.artist(
            id, name, birthplace, birthdate, image)
            VALUES ('cd47e33b-f786-4286-9bef-5a40fddf3af5', 'Grace Cossington Smith', 'Neutral Bay, New South Wales, Australia', TO_DATE('20/04/1892', 'DD/MM/YYYY'), 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Grace_Cossington_Smith_Turramurra.jpg');
        --101

        INSERT INTO public.artist(
            id, name, birthplace, birthdate, image)
            VALUES ('41328be3-7176-4c10-b0b7-8b64ffc7b348', 'Frédéric Bruly Bouabré', 'Zépréguhé, Côte d''Ivoire', TO_DATE('11/03/1923', 'DD/MM/YYYY'), 'https://elhombrejazmin.com/wp-content/imagenes/2013/11/frederic_bruly_bouabre.jpg');
        --102

        INSERT INTO public.artist(
            id, name, birthplace, birthdate, image)
            VALUES ('816744e4-24af-4441-a295-436e2f0947d5', 'Cornelia Parker', 'Cheshire, England', TO_DATE('14/07/1956', 'DD/MM/YYYY'), 'https://upload.wikimedia.org/wikipedia/commons/2/28/Cornelia-Parker-010-1.jpg');
        --103

        INSERT INTO public.artist(
            id, name, birthplace, birthdate, image)
            VALUES ('73607efd-7622-4552-8dad-4c8122930f7b', 'Paul Cézanne', 'Aix-en-Provence, France', TO_DATE('19/01/1839', 'DD/MM/YYYY'), 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Paul-Cezanne.jpg/220px-Paul-Cezanne.jpg');
        --104

        INSERT INTO public.artist(
            id, name, birthplace, birthdate, image)
            VALUES ('e1e19a33-b86f-4ea5-b5c3-ffa7ed65a60a', 'Vincent van Gogh', 'Zundert, Netherlands', TO_DATE('30/03/1853', 'DD/MM/YYYY'), 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/474px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg');
        --105

        INSERT INTO public.artist(
            id, name, birthplace, birthdate, image)
            VALUES ('53e40cc3-d882-48d7-81c7-27a06f516f60', 'David Bomberg', 'Birmingham, England', TO_DATE('05/12/1890', 'DD/MM/YYYY'), 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Photo_of_Davis_Bomberg.jpg');
        --106

        -- Inserting artworks
        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('88809645-72d1-4b97-b529-b1e04e963abe', 'Dogs', 1975, 'Brett Whiteley felt deeply connected to animals since childhood. In fact, between 1965 and 1988 he staged four exhibitions whose predominant or exclusive subject was animals that he had observed in zoos, domestic environments and in nature.', 'Painting', 'https://www.bendigoregion.com.au/sites/default/files/2021-05/brett_whiteley_greg_dogs.jpg', '014419af-333b-4402-bde5-54b336c72038', 'cce850bf-1a68-45a1-8084-050e39c20ad4', '521e1598-e8be-4923-875e-5873c94c48e7');
        --100

        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('02aca6be-cf46-476f-b534-e66637f6a430', 'Self portrait in the studio', 1976, 'Similar to Brett Whiteley''s other major paintings of this period, ''Self-portrait in the studio'' exudes a sense of sumptuous living and the liquid presence of the harbour through what he called ''the ecstasy-like effect of Ultramarine blue''. Whiteley''s tiny mirror self-portrait also reflects the influence of Eastern art in his portrayal of man as merely part of a larger landscape.', 'Painting', 'https://www.bendigoregion.com.au/sites/default/files/2021-05/brett_whiteley_greg_self.jpg', '014419af-333b-4402-bde5-54b336c72038', 'cce850bf-1a68-45a1-8084-050e39c20ad4', '521e1598-e8be-4923-875e-5873c94c48e7');
        --101

        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('c0df5f00-c92c-439e-bfe0-9cb5bed7e0fe', 'Self portrait', 1931, 'Painted in 1948, Cossington Smith''s self-portrait represents her vibrant use of light-infused colour and interest in structure and form. Depicting herself in the prime of her long career, the short brushstrokes, laden with paint, build up a strong colour portrait and capture the dedication she felt towards her art in her intense focused gaze and the determined set of her lips.', 'Painting', 'https://www.portrait.gov.au/files/b/b/2/c/i5398.jpg', '014419af-333b-4402-bde5-54b336c72038', '64b7dd33-057c-4158-bb99-710ebf36be23', 'cd47e33b-f786-4286-9bef-5a40fddf3af5');
        --102

        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('35822b87-48db-42d1-a746-c1b08bc7d443', 'Connaissance du monde', 1996, 'In the late 1970s, after decades of making handwritten manuscripts, Bouabré began to draw on found cardboard, combining image and text. From the 1980s onwards, as the scope of his interests grew, he embarked on an all-encompassing project, drawing from observation almost daily. He titled the open-ended series of drawings Connaissance du Monde, and worked on it until his death in 2014, systematically compiling and classifying forms, ideas, and a wide range of phenomena, including domestic objects, cloud formations, and tribal scarifications, as well as the political climate and world events.', 'Painting', 'https://universes.art/fileadmin/_processed_/2/b/csm_14_ivory_coast_16b2369926.jpg', '3b06296a-e14f-4530-af45-3673e87e54fe', 'ac054cd7-1da5-4681-9bf6-1983da7fa8a5', '41328be3-7176-4c10-b0b7-8b64ffc7b348');
        --103

        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('dd5457af-7389-43e8-bc06-4e5b6dd63898', 'Thirty Pieces of Silver', 1989, 'Thirty Pieces of Silver comprises over a thousand flattened silver objects, including plates, spoons, candlesticks, trophies, cigarette cases, teapots and trombones. All the objects were ceremoniously crushed by a steamroller at Cornelia Parker''s request. She then arranged the transformed silver artefacts into thirty disc-shaped groups, which are suspended about a foot from the floor by hundreds of fine wires. Each ''disc'' is approximately ninety centimetres in diameter and they are always hung in orderly rows, although their overall configuration is adapted each time to the space in which the work is displayed. The title refers to the biblical story of how the apostle Judas Iscariot betrayed Jesus in return for thirty pieces of silver.', 'Object', 'https://www.tate.org.uk/art/images/work/T/T07/T07461_10.jpg', 'a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', 'a16e74c1-f0bc-4c78-a611-2a8931ea0bc8', '816744e4-24af-4441-a295-436e2f0947d5');
        --104

        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('4727fb48-9be2-4310-8934-fefce7f1bb27', 'Cold Dark Matter: An Exploded View', 1991, 'Cold Dark Matter: An Exploded View is the restored contents of a garden shed exploded by the British Army at the request of the artist Cornelia Parker. The surviving pieces have been used by Parker to create an installation suspended from the ceiling as if held mid-explosion. Lit by a single lightbulb the fragments cast dramatic shadows on the gallery''s walls.', 'Object', 'https://media.tate.org.uk/aztate-prd-ew-dg-wgtail-st1-ctr-data/images/.width-1200_LwsaUXy.jpg', 'a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', 'a16e74c1-f0bc-4c78-a611-2a8931ea0bc8', '816744e4-24af-4441-a295-436e2f0947d5');
        --105

        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('dc2f3ba5-eb7b-402a-b487-70b10f9f0cc4', 'Mont Sainte-Victoire seen from Bellevue', 1887, 'Mont Sainte-Victoire seen from Bellevue, 1885-87 is another panoramic view, of a delicate, tranquil beauty. Admirable is the thought of opposing to the distant landscape the high tree in the foreground, a form through which the near and far, the left and right, become more sharply defined, each with its own mood and dominant. Breadth, height, and depth are almost equally developed; the balance of these dimensions is one of the sources of the fullness and calm of the painting. We experience the vastness of the space in the broad valley with the viaduct; we feel the equivalent depth in the long, endless passage from the house in the foreground to the mountain top; but we also measure the great height of the space in the central tree which spans the whole vertical dimension, crossing every zone of the landscape and reaching from the lower to the upper edge of the canvas.', 'Painting', 'https://upload.wikimedia.org/wikipedia/commons/3/30/Paul_Cezanne_La_Montagne_Saint_Victoire_Barnes.jpg', 'a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', 'f6a16b6a-9fd0-4f23-87f1-2ae2bc796288', '73607efd-7622-4552-8dad-4c8122930f7b');
        --106

        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('b10c1eca-c98f-4e5f-ae6d-898391e047dc', 'The Large Bathers', 1906, 'The bathers theme originated in the Renaissance and traditionally showed idealized female bodies in total harmony with nature. Yet Cézanne disturbs this easy relationship here and in his other works on the subject. In this canvas, thick with paint, space is hard to read, and the landscape —note the dead tree branches and ominous clouds—seems harsh and threatening. While he derived many of the figures'' poses from classical statuary, Cézanne overturns tradition as soon as he references it: bodies are deliberately distorted, with obliterated faces, truncated limbs, and uneven flesh.', 'Painting', 'https://i.ytimg.com/vi/8ilh53BJ3qY/maxresdefault.jpg', 'a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', 'f6a16b6a-9fd0-4f23-87f1-2ae2bc796288', '73607efd-7622-4552-8dad-4c8122930f7b');
        --107

        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('08a69370-30b1-45bc-8d5e-c11ef5d7e19a', 'L''Arlésienne', 1889, 'While in Arles, Van Gogh painted two very similar portraits of Marie Ginoux, the proprietress of the Café de la Gare, wearing the regional costume of the legendary dark-haired beauties of Arles. The first version, which he described in a letter of November 1888 as "an Arlésienne . . . knocked off in one hour," must be the more thinly and summarily executed portrait in the Musée d''Orsay, Paris. In it a parasol and gloves lie on the table instead of books. This portrait belonged to the sitter until she sold it in 1895.', 'Painting', 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436529/795979/main-image', 'a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', '9ca0a07b-f0da-4ca9-8d93-6360ca3ffe90', 'e1e19a33-b86f-4ea5-b5c3-ffa7ed65a60a');
        --108

        INSERT INTO public.artwork(
            id, name, year, description, type, "mainImage", "museumId", "exhibitionId", "artistId")
            VALUES ('944fa24e-950a-4eec-80c2-c2b04331591e', 'The Mud Bath', 1914, 'Bathing figures were a traditional way of depicting the nude, but here Bomberg brings the subject into the modern era by basing the scene on steam baths used by the local Jewish population near Bomberg''s home in east London. Bomberg was closely associated with a group of artists known as the vorticists. Their aim was to create art that expressed the modern world through imagery derived from machines and the urban environment. Here Bomberg reduces the human figure to a series of geometric shapes, a process he described as ''searching for an intenser expression … where I use Naturalistic Form I have stripped it of all irrelevant matter.''', 'Painting', 'https://www.tate.org.uk/art/images/work/T/T00/T00656_10.jpg', 'a1d41a57-8431-47c2-ba68-9f35a4c0b3b7', '9ca0a07b-f0da-4ca9-8d93-6360ca3ffe90', '53e40cc3-d882-48d7-81c7-27a06f516f60');
        --109

        -- Inserting images
        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('50a28fe6-9771-4a2f-8a9a-c725c97a8dc5', 'https://www.bendigoregion.com.au/sites/default/files/2021-05/brett_whiteley_greg_dogs.jpg', 'Dogs (1)', 889, 1296, '88809645-72d1-4b97-b529-b1e04e963abe');
        --100

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('be9c9175-3419-416a-9337-40ab38080717', 'shorturl.at/ijzDK', 'Dogs (2)', 509, 742, '88809645-72d1-4b97-b529-b1e04e963abe');
        --101

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('db4a0f02-f689-45d7-a4a9-d90c1ad9d4fe', 'https://www.bendigoregion.com.au/sites/default/files/2021-05/brett_whiteley_greg_self.jpg', 'Self portrait in the studio (1)', 961, 1229, '02aca6be-cf46-476f-b534-e66637f6a430');
        --102

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('ca9bd7ab-2820-468b-abae-5d19b89f9832', 'http://4.bp.blogspot.com/-us2UwO9e6wY/UZeWyY-AnzI/AAAAAAAAQbc/Fic2bNnJK-4/s640/Whiteley,+Brett,+Self-portrait+in+studio+1975-76.jpg', 'Self portrait in the studio (2)', 265, 505, '02aca6be-cf46-476f-b534-e66637f6a430');
        --103

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('e38a2801-b20d-418c-93ee-8802f305fe24', 'https://www.portrait.gov.au/files/b/b/2/c/i5398.jpg', 'Self portrait (1)', 961, 744, 'c0df5f00-c92c-439e-bfe0-9cb5bed7e0fe');
        --104

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('5205f814-90b1-4e40-8d02-584d3b8800c7', 'https://www.portrait.gov.au/files/b/b/2/c/i5398-trs.jpg', 'Self portrait (2)', 417, 742, 'c0df5f00-c92c-439e-bfe0-9cb5bed7e0fe');
        --105

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('d9ce62c8-441f-4310-a196-3580b55b82b1', 'https://universes.art/fileadmin/_processed_/2/b/csm_14_ivory_coast_16b2369926.jpg', 'Connaissance du Monde (1)', 400, 585, '35822b87-48db-42d1-a746-c1b08bc7d443');
        --106

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('33fa41d0-229b-4897-a71b-3a716d969718', 'https://www.artmajeur.com/medias/standard/f/r/frederic-bruly-bouabre/artwork/12692411_981f68a5-6473-48dc-8efb-8a3c03a287e6.jpg', 'Connaissance du Monde (2)', 649, 525, '35822b87-48db-42d1-a746-c1b08bc7d443');
        --107

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('0c90baaf-2c8d-4f98-9cf9-7ddecb959f39', 'https://www.tate.org.uk/art/images/work/T/T07/T07461_10.jpg', 'Thirty Pieces of Silver (1)', 611, 742, 'dd5457af-7389-43e8-bc06-4e5b6dd63898');
        --108

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('687cb62a-054f-4364-99ad-06ea1b9e9a66', 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Thirty_Pieces_of_Silver.jpg', 'Thirty Pieces of Silver (2)', 556, 742, 'dd5457af-7389-43e8-bc06-4e5b6dd63898');
        --109

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('8aac33e3-e5f8-4844-9408-19fa52ff25fa', 'https://media.tate.org.uk/aztate-prd-ew-dg-wgtail-st1-ctr-data/images/.width-1200_LwsaUXy.jpg', 'Cold Dark Matter: An Exploded View (1)', 649, 511, '4727fb48-9be2-4310-8934-fefce7f1bb27');
        --110

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('2c6a2877-faea-4fd5-a9da-91c503651c1f', 'https://chisenhale.org.uk/wp-content/uploads/Cold-Dark-Matter-an-Exploded-View_crop-1361x1080.jpg', 'Cold Dark Matter: An Exploded View (2)', 588, 742, '4727fb48-9be2-4310-8934-fefce7f1bb27');
        --111

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('52b943e2-dec9-4d6d-86ed-791247aa56f3', 'https://upload.wikimedia.org/wikipedia/commons/3/30/Paul_Cezanne_La_Montagne_Saint_Victoire_Barnes.jpg', 'Mont Sainte-Victoire seen from Bellevue (1)', 588, 742, 'dc2f3ba5-eb7b-402a-b487-70b10f9f0cc4');
        --112

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('8f4cbd45-0e5a-4ee9-87b2-a1ccfe89dd29', 'https://www.phaidon.com/resource/cazannemont1.jpg', 'Mont Sainte-Victoire seen from Bellevue (2)', 498, 620, 'dc2f3ba5-eb7b-402a-b487-70b10f9f0cc4');
        --113

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('3572d6c2-1973-4df7-bae2-7071bf04fafc', 'https://i.ytimg.com/vi/8ilh53BJ3qY/maxresdefault.jpg', 'The Large Bathers (1)', 417, 742, 'b10c1eca-c98f-4e5f-ae6d-898391e047dc');
        --114

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('2b6b1c31-0787-4e10-a799-ece09079fa39', 'https://www.reprodart.com/kunst/paul_cezanne/the-large-bathers.jpg', 'The Large Bathers (2)', 501, 600, 'b10c1eca-c98f-4e5f-ae6d-898391e047dc');
        --115

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('e97267e0-b398-4ea0-9f21-3c5e8f5caf88', 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/436529/795979/main-image', 'L''Arlésienne (1)', 649, 515, '08a69370-30b1-45bc-8d5e-c11ef5d7e19a');
        --116

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('376bf4f3-2f07-49cd-809f-3f6b187e1b19', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/LArlesienneWithBooks.jpg/300px-LArlesienneWithBooks.jpg', 'L''Arlésienne (2)', 383, 300, '08a69370-30b1-45bc-8d5e-c11ef5d7e19a');
        --117

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('cb6dac35-5181-4bae-a099-ab8fb92bbafd', 'https://www.tate.org.uk/art/images/work/T/T00/T00656_10.jpg', 'The Mud Bath (1)', 509, 742, '944fa24e-950a-4eec-80c2-c2b04331591e');
        --118

        INSERT INTO public.image(
            id, source, "altText", height, width, "artworkId")
            VALUES ('a82b8b12-ffcd-4d0a-871f-207bb368f537', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Bomberg%2C_The_Mud_Bath.jpg/300px-Bomberg%2C_The_Mud_Bath.jpg', 'The Mud Bath (2)', 201, 300, '944fa24e-950a-4eec-80c2-c2b04331591e');
        --119

        -- Associating artists and movements
        INSERT INTO public.movement_artists_artist(
            "movementId", "artistId")
            VALUES ('d6456889-1fdc-42e9-ac9a-cd60cd44bc26', '521e1598-e8be-4923-875e-5873c94c48e7');
        --100,100

        INSERT INTO public.movement_artists_artist(
            "movementId", "artistId")
            VALUES ('d6456889-1fdc-42e9-ac9a-cd60cd44bc26', 'cd47e33b-f786-4286-9bef-5a40fddf3af5');
        --100,101

        INSERT INTO public.movement_artists_artist(
            "movementId", "artistId")
            VALUES ('d6456889-1fdc-42e9-ac9a-cd60cd44bc26', '53e40cc3-d882-48d7-81c7-27a06f516f60');
        --100,106

        INSERT INTO public.movement_artists_artist(
            "movementId", "artistId")
            VALUES ('8bd9bc35-19f4-4645-90bd-c914c67cd0b3', 'cd47e33b-f786-4286-9bef-5a40fddf3af5');
        --101,101

        INSERT INTO public.movement_artists_artist(
            "movementId", "artistId")
            VALUES ('8bd9bc35-19f4-4645-90bd-c914c67cd0b3', '73607efd-7622-4552-8dad-4c8122930f7b');
        --101,104

        INSERT INTO public.movement_artists_artist(
            "movementId", "artistId")
            VALUES ('8bd9bc35-19f4-4645-90bd-c914c67cd0b3', 'e1e19a33-b86f-4ea5-b5c3-ffa7ed65a60a');
        --101,105

        INSERT INTO public.movement_artists_artist(
            "movementId", "artistId")
            VALUES ('db49a014-a820-48e0-9a67-ea7fd7f69a6b', '41328be3-7176-4c10-b0b7-8b64ffc7b348');
        --102,102

        INSERT INTO public.movement_artists_artist(
            "movementId", "artistId")
            VALUES ('f6893e91-079f-4c80-880c-bbbc163b7eec', '816744e4-24af-4441-a295-436e2f0947d5');
        --103,103

        INSERT INTO public.movement_artists_artist(
            "movementId", "artistId")
            VALUES ('467c162b-08c2-40c3-831e-c33dd2f46a44', '53e40cc3-d882-48d7-81c7-27a06f516f60');
        --104,106
    `;

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(this.migration);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
