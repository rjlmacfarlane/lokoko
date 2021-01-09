DROP TABLE IF EXISTS favourite_listings CASCADE;

CREATE TABLE favourite_listings (
   id SERIAL PRIMARY KEY NOT NULL,
   favourited BOOLEAN,
   created_date TIMESTAMP,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE
);

