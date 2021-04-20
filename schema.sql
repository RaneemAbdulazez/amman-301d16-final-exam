DROP TABLE IF EXISTS simpsons;

CREATE TABLE simpsons (
  id SERIAL PRIMARY KEY NOT NULL,
  quote VARCHAR(256) ,
  character_s VARCHAR(256) ,
  imageurl VARCHAR(256),
  characterDirection  VARCHAR(256),
  source  VARCHAR(256)
);

