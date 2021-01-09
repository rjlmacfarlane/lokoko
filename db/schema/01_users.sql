DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS provinces;

CREATE TYPE provinces AS ENUM ('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon');

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  province provinces NOT NULL,
  city VARCHAR(20) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  profile_picture VARCHAR(255)
);
