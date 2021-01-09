INSERT INTO users (name, email, province, city, phone_number, profile_picture) VALUES
('Billy Wu', 'wumbo@gmail.com', 'Ontario', 'Toronto', 4164172638, 'https://i.imgur.com/DD4wbUzs.jpg'),
('Sara Liu', 'saraliu@gmail.com', 'Ontario', 'Waterloo', 2264917618, 'https://i.imgur.com/DD4wbUzs.jpg'),
('John Smith', 'johnsmith711@gmail.com', 'Ontario', 'Hamilton', 9054917618, 'https://i.imgur.com/DD4wbUzs.jpg');

INSERT INTO listings (title, description, thumbnail_photo_url, main_photo_url, price, condition, posted_dated, sold_date, category_id, user_id)
VALUES
('Computer chair', 'blue color', 'https://i.imgur.com/QR2RdTgt.jpg', 'https://i.imgur.com/QR2RdTg.jpg', 30, 'Used', '2008-01-09 15:45:21', NULL, 4, 1),
('Sennheiser headphones', 'black color, 300 ohms', 'https://i.imgur.com/tNuze0j.jpg', 'https://i.imgur.com/tNuze0t.jpg', 200, 'New', '2008-03-09 15:45:21', NULL, 3, 3);

INSERT INTO listing_categories (category_list) VALUES ('Cars', 'Clothing', 'Electronics', 'Furniture', 'Musical Instruments', 'Other');

INSERT INTO favourite_listings (favourited, created_date, user_id, listing_id) VALUES
(true, '2008-03-10 15:45:21', 1, 3),
(true, '2008-05-12 09:45:21', 2, 3);
