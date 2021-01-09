DROP TABLE IF EXISTS listings CASCADE;
DROP TYPE IF EXISTS condition_list;

CREATE TYPE condition_list AS ENUM ('New', 'Used');

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  main_photo_url VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  condition condition_list,
  posted_date TIMESTAMP NOT NULL,
  sold_date TIMESTAMP NOT NULL,
  category_id INTEGER REFERENCES listing_categories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);




