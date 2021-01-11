DROP TABLE IF EXISTS listing_categories CASCADE;
DROP TYPE IF EXISTS category_list;

CREATE TYPE category_list AS ENUM ('Cars', 'Clothing', 'Electronics', 'Furniture', 'Musical Instruments', 'Other');

CREATE TABLE listing_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name category_list NOT NULL
);
