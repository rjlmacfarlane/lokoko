INSERT INTO users (name, email, province, city, phone_number, profile_picture) VALUES
('Billy Wu', 'wumbo@gmail.com', 'Ontario', 'Toronto', '4164172638', 'https://i.imgur.com/DD4wbUzs.jpg'),
('Sara Liu', 'saraliu@gmail.com', 'Ontario', 'Waterloo', '2264917618', 'https://i.imgur.com/DD4wbUzs.jpg'),
('John Smith', 'johnsmith711@gmail.com', 'Ontario', 'Hamilton', '9054917618', 'https://i.imgur.com/DD4wbUzs.jpg'),
('Luke Berzins', 'getting.a.haircut@thebarbershop.com', 'Ontario', 'Toronto', '4165553890', 'https://i.imgur.com/DD4wbUzs.jpg' ),
('Elon Musk', 'lets.go@tomars.com', 'Newfoundland and Labrador', 'Paradise', '7099865341', 'https://i.imgur.com/DD4wbUzs.jpg'),
('Walter White', 'crystal.blue@persuasion.com', 'Alberta', 'Ft. McMurray', '4032394137', 'https://i.imgur.com/DD4wbUzs.jpg'),
('Saul Goodman', 'youhaverights@bettercallsaul.com', 'British Columbia', 'Vancouver', '6048089812', 'https://i.imgur.com/DD4wbUzs.jpg'),
('David Bowie', 'floating@tincan.com', 'Manitoba', 'Winnipeg', '2048953890', 'https://i.imgur.com/DD4wbUzs.jpg'),
('William Riker', 'jonathan.cornflakes@unitedfederation.com', 'Saskatchewan', 'Regina', '3067778303', 'https://i.imgur.com/DD4wbUzs.jpg');

INSERT INTO listings (title, description, thumbnail_photo_url, main_photo_url, price, condition, posted_date, sold_date, category_id, user_id)
VALUES
('Computer chair', 'blue color', 'https://i.imgur.com/QR2RdTgt.jpg', 'https://i.imgur.com/QR2RdTg.jpg', 30, 'Used', '2008-01-09 15:45:21', NULL, 4, 1),
('Sennheiser headphones', 'black color, 300 ohms', 'https://i.imgur.com/tNuze0j.jpg', 'https://i.imgur.com/tNuze0t.jpg', 200, 'New', '2008-03-09 15:45:21', NULL, 3, 1),
('Barber Chair', 'black color', 'https://i.redd.it/ewkikofclok41.jpg', 'https://i.redd.it/ewkikofclok41.jpg', 100, 'Used', '2008-03-09 15:45:21', NULL, 4, 2),
('2004 Pontiac Aztek', 'Green automatic, new windshield!', 'http://pics.imcdb.org/15489/breakingbads05e04720phdtvx264-evolvemkv_000107064.jpg', 'http://pics.imcdb.org/15489/breakingbads05e04720phdtvx264-evolvemkv_000107064.jpg', 50, 'Used', '2005-03-09 15:45:21', NULL, 1, 6),
('Bagpipes', 'Tartan, only used once to get myself fired.', 'https://www.wdiy.org/sites/wdiy/files/styles/medium/public/201707/pipes.jpg', 'https://www.wdiy.org/sites/wdiy/files/styles/medium/public/201707/pipes.jpg', 250, 'Used', '2006-03-09 15:45:21', NULL, 5, 7),
('Falcon 9 Rocket', 'Launched seven times. Inserted 311 Starlink satellites into orbit.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Bangabandhu_Satellite-1_Mission_(42025499722).jpg/270px-Bangabandhu_Satellite-1_Mission_(42025499722).jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Bangabandhu_Satellite-1_Mission_(42025499722).jpg/270px-Bangabandhu_Satellite-1_Mission_(42025499722).jpg', 90000000, 'Used', '2020-05-05 13:30:21', NULL, 6, 5),
('Stage worn costume', 'Worn on tour in Winnipeg, 1984', 'https://i.pinimg.com/736x/2f/16/66/2f1666025c24dbb32a55457cb3e1f80c.jpg', 'https://i.pinimg.com/736x/2f/16/66/2f1666025c24dbb32a55457cb3e1f80c.jpg', 4000, 'Used', '2005-03-09 15:45:21', NULL, 2, 8);

INSERT INTO listing_categories (name) VALUES
  ('Cars'),
  ('Clothing'),
  ('Electronics'),
  ('Furniture'),
  ('Musical Instruments'),
  ('Other');

INSERT INTO favourite_listings (created_date, user_id, listing_id) VALUES
('2008-03-10 15:45:21', 1, 3),
('2008-05-12 09:45:21', 3, 2);
