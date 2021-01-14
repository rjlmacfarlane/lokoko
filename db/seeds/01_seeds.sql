INSERT INTO users (name, email, province, city, phone_number, profile_picture) VALUES
('Billy Wu', 'wumbo@gmail.com', 'Ontario', 'Toronto', '4164172638', 'https://i.imgur.com/DD4wbUzs.jpg'),
('Sara Liu', 'saraliu@gmail.com', 'Ontario', 'Waterloo', '2264917618', 'https://i.imgur.com/DD4wbUzs.jpg'),
('John Smith', 'johnsmith@gmail.com', 'Ontario', 'Hamilton', '9054917618', 'https://i.imgur.com/DD4wbUzs.jpg'),
('Luke Berzins', 'getting.a.haircut@thebarbershop.com', 'Ontario', 'Toronto', '4165553890', 'https://i.imgur.com/DD4wbUzs.jpg' ),
('Elon Musk', 'lets.go@tomars.com', 'Newfoundland and Labrador', 'Paradise', '7099865341', 'https://i.imgur.com/DD4wbUzs.jpg'),
('Walter White', 'crystal.blue@persuasion.com', 'Alberta', 'Ft. McMurray', '4032394137', 'https://i.imgur.com/DD4wbUzs.jpg'),
('Saul Goodman', 'youhaverights@bettercallsaul.com', 'British Columbia', 'Vancouver', '6048089812', 'https://i.imgur.com/DD4wbUzs.jpg'),
('David Bowie', 'floating@tincan.com', 'Manitoba', 'Winnipeg', '2048953890', 'https://i.imgur.com/DD4wbUzs.jpg'),
('William Riker', 'jonathan.cornflakes@unitedfederation.com', 'Saskatchewan', 'Regina', '3067778303', 'https://i.imgur.com/DD4wbUzs.jpg');

INSERT INTO listing_categories (name) VALUES
  ('Cars'),
  ('Clothing'),
  ('Electronics'),
  ('Furniture'),
  ('Musical Instruments'),
  ('Other');

INSERT INTO listings (title, description, thumbnail_photo_url, main_photo_url, price, condition, posted_date, sold_date, category_id, user_id)
VALUES
('Computer chair', 'Blue computer chair. Got it from Walmart ages ago. Just a chair. Nothing great about it, nothing wrong with it. If you have a computer, you can also have a chair.', 'https://i.imgur.com/QR2RdTgt.jpg', 'https://i.imgur.com/QR2RdTg.jpg', 30, 'Used', '2008-01-09 15:45:21', NULL, 4, 1),

('Sennheiser headphones', 'Black color, 300 ohms. Awesome bass. Selling because they tend to fall off when headbanging. They work great for studio headphones, but not for headbanging. Headbanging is bad for your brain anyway.', 'https://i.imgur.com/tNuze0jt.jpg', 'https://i.imgur.com/tNuze0j.jpg', 200, 'New', '2008-03-09 15:45:21', NULL, 3, 1),

('Barber Chair', 'Selling this classic barber chair. I have had my hair cut in this chair probably a million times. I get haircuts three times a week, so a lot have been done in this chair. Now you can sit in this chair and get your haircut as many times as I did.', 'https://i.redd.it/ewkikofclok41.jpg', 'https://i.redd.it/ewkikofclok41.jpg', 1250, 'Used', '2008-03-09 15:45:21', NULL, 4, 4),

('2004 Pontiac Aztek', 'Green, automatic transmission. Definitely has not been used to transport any controlled substances. I hit a deer a while back, but I got it fixed. Selling because I am a big shot now and I want to buy a sports car. New windshield!', 'http://pics.imcdb.org/15489/breakingbads05e04720phdtvx264-evolvemkv_000107064.jpg', 'http://pics.imcdb.org/15489/breakingbads05e04720phdtvx264-evolvemkv_000107064.jpg', 50, 'Used', '2005-03-09 15:45:21', NULL, 1, 6),

('Bagpipes', 'Tartan, only used once to get myself fired. I could never fit in with the real lawyers. They are a bunch of squares.', 'https://www.wdiy.org/sites/wdiy/files/styles/medium/public/201707/pipes.jpg', 'https://www.wdiy.org/sites/wdiy/files/styles/medium/public/201707/pipes.jpg', 250, 'Used', '2006-03-09 15:45:21', NULL, 5, 7),

('Falcon 9 Rocket', 'Launched seven times. Inserted 311 Starlink satellites into orbit, and two classified spy sattelites for the US government. Selling to finance my trip to Mars.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Bangabandhu_Satellite-1_Mission_(42025499722).jpg/270px-Bangabandhu_Satellite-1_Mission_(42025499722).jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Bangabandhu_Satellite-1_Mission_(42025499722).jpg/270px-Bangabandhu_Satellite-1_Mission_(42025499722).jpg', 90000000, 'Used', '2020-05-05 13:30:21', NULL, 6, 5),

('Stage worn costume', 'Worn on tour in Winnipeg, 1984', 'https://i.pinimg.com/736x/2f/16/66/2f1666025c24dbb32a55457cb3e1f80c.jpg', 'https://i.pinimg.com/736x/2f/16/66/2f1666025c24dbb32a55457cb3e1f80c.jpg', 4000, 'Used', '2005-03-09 15:45:21', NULL, 2, 8),

('Uber Alternative', 'Screw uber! Never drink and drive. Message me and I will come get you in a 2000 Ford F-250 4x4, with a case of beer in a cooler in the back, blasting Skynyrd on the speakers, hollaring HELL YEAH BROTHER! at everything you say.', '/img/truck.png', '/img/truck.png', 20, 'New', '2021-01-11 15:30:00', NULL, 6, 1),

('50 lbs of Almonds!', 'HELP! I accidentally ordered 50 pounds of almonds. I only needed 1 for my recipe. Please, my girlfriend will kill me, only $1!', '/img/almonds.png', '/img/almonds.png', 1, 'New', '2021-01-11 14:12:00', NULL, 6, 2),

('Australian Didgeridoo', 'Authentic Australian Aboriginal Didgeridoo. Needs work. $10', '/img/didge.png', '/img/didge.png', 10, 'New', '2021-01-07 14:12:00', NULL, 5, 8),

('20 tins of Holiday Popcorn (minus the caramel corn)', 'You know damn well what happened to that caramel corn.', '/img/popcorn.png', '/img/popcorn.png', 7, 'Used', '2020-12-30 10:15:00', NULL, 6, 9),

('Virus-proof PC/Printer Hybrid', 'Impervious to viruses, impervious to spam, no Windows updates (or any updates of any kind), no personal firewall needed, no printer needed', '/img/typewriter.png', '/img/typewriter.png', 25, 'Used', '2021-01-05 14:12:00', NULL, 3, 5),

('Human-sized hamster wheel', 'Human-sized hamster wheel for sale, available for immediate pickup. Can accomodate up to 200 pounds. Fully functional. Not recommended for homes with small children or animals. 50 pounds of shredded newspaper included FREE. Contact for appointment to view.', '/img/hamster-wheel.png', '/img/hamster-wheel.png', 150, 'Used', '2021-01-07 14:12:00', NULL, 6, 3),

('Haunted Doll', 'Looks cute, but it is evil. My dog growls at it. Wherever it is, that room is so cold you can see your breath. Every now and then we hear children laughing and playing, but we have no children. I will not feel safe until I get this out of my house. We tried throwing it out, but it keeps reappearing. If you like evil stuff like this or are a witch or something, come pick it up, make it yours. Maybe a priest can exorcise it?', '/img/doll.png', '/img/doll.png', 2, 'Used', '2020-10-31 00:00:00', NULL, 6, 2),

('SnowCat Limousine Hybrid Vehicle', 'For sale SnowCat Limousine hybrid vehicle. I took a 1989 Cadillac stretch limo and combined it with a Bombardier SV250 SnowCat. Last driven 2 years ago.', '/img/snowcat.png', '/img/snowcat.png', 850, 'Used', '2021-01-03 11:12:13', NULL, 1, 6),

('Saddle', 'Very comfortable, white colour, fits any horse, SUPER easy to clean. Ride in style!', '/img/saddle.png', '/img/saddle.png', 12, 'Used', '2021-01-06 18:12:00', NULL, 6, 1),

('Authentic Horgon from Risa', 'Attract the mate of your dreams with this authentic Horgon from the planet Risa, or give it as a gift to your lonely captain.', '/img/horgon.png', '/img/horgon.png', 55, 'New', '2021-01-10 08:12:00', NULL, 4, 9),

('Barber services in the GTA!', 'Hi my name is Luke Berzins. I love getting haircuts, and I love giving haircuts! I will be offering evening and weekend haircut services to help pay for my Web Development Bootcamp and Lighthouse Labs. Any type of hair, any type of style, just drop me a line!', '/img/barber.png', '/img/barber.png', 20, 'New', '2020-11-23 10:00:00', NULL, 6, 4),

('Conair Even Cut Electric Barber Clippers', 'Selling these Conair Even Cut electric barber clippers. I have 400 of them, all brand new, unopened and never used. I have so many of these, they are piling up in my house and I have no more room to walk around. My girlfriend keeps tripping over them and my dog is always sad. They gotta go, selling for cheap!', '/img/conair.png', '/img/conair.png', 15, 'New', '2021-01-01 08:12:00', NULL, 3, 4),

('Vintage Barber Set', 'Vintage barber set, includes electric clippers with blade oil and attachments, whisker brush, scissors, and comb. This has been in my family since my grandfather lived in Latvia. Selling so that I can buy an awesome new computer to do my web development work on.', '/img/vintage-clippers.png', '/img/vintage-clippers.png', 40, 'New', '2020-12-23 10:00:00', NULL, 6, 4),

('Gentlemen Barber Mustache Kit', 'Gentlemen Barber Mustache Kit. Includes mustache comb, mustache wax, and a small pair of scissors. I got this for Christmas. Selling because I do not have a mustache.', '/img/mustache-kit.png', '/img/mustache-kit.png', 12, 'New', '2020-12-26 18:42:10', NULL, 6, 4),

('Japanese Barber Scissors', 'Premium quality barber scissors, handmade in Japan by Japanese barber-monks. Comes in a real leather case. Picked these up when I went to Japan for a haircut.', '/img/japan-scissors.png', '/img/japan-scissors.png', 50, 'Used', '2021-01-13 17:12:55', NULL, 6, 4 ),

('Barber Shop Art Prints, 4-piece', 'Here is a 4-piece set of barber shop art prints. Perfect if you own a barber shop (like I do), or if you are in a barbershop quartet: each member can have their own!', '/img/barber-prints.png', '/img/barber-prints.png', 30, 'Used', '2021-01-12 13:42:15', NULL, 6, 4);



INSERT INTO favourite_listings (created_date, user_id, listing_id) VALUES
('2008-03-10 15:45:21', 1, 3),
('2008-05-12 09:45:21', 3, 2),
('2008-05-12 09:45:21', 1, 2),
('2008-05-12 09:45:21', 1, 4),
('2008-05-12 09:45:21', 1, 5),
('2008-05-12 09:45:21', 2, 5),
('2008-05-12 09:45:21', 2, 3),
('2008-05-12 09:45:21', 2, 6);

INSERT INTO messages (message, time_sent, listing_id, sender_id, receiver_id) VALUES
('Hi, is this still available?', '2008-03-09 20:55:21', 2, 2, 1),
('Fine keep ignoring me!', '2008-03-09 17:00:04', 2, 2, 1),
('Jeez I was sleeping', '2008-03-10 07:30:00', 2, 1, 2),
('$100 is my best offer', '2008-03-10 08:10:07', 2, 2, 1),
('I''m blocking you...', '2008-03-10 07:30:00', 2, 1, 2);
