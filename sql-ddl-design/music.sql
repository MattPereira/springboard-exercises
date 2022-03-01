-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music


CREATE TABLE artists
( 
  id SERIAL PRIMARY KEY,
  artist_name TEXT
);


CREATE TABLE song_artists
(
  id SERIAL PRIMARY KEY,
  artist1_id INTEGER NOT NULL REFERENCES artists,
  artist2_id INTEGER REFERENCES artists
);


CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  producer_name TEXT
);


CREATE TABLE song_producers
(
  id SERIAL PRIMARY KEY,
  producer1_id INTEGER REFERENCES producers,
  producer2_id INTEGER REFERENCES producers
);


CREATE TABLE albums
(
  id SERIAL PRIMARY KEY,
  album_name TEXT
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  arists_id INTEGER REFERENCES song_artists,
  album_id INTEGER,
  producers_id INTEGER REFERENCES song_producers
);



INSERT INTO artists
  (artist_name)
VALUES
  ('Hanson'),
  ('Queen'),
  ('Maraiah Cary'),
  ('Boyz II Men'),
  ('Lady Gaga'),
  ('Bradley Cooper'),
  ('NickelBack'),
  ('Jay Z'),
  ('Alicia Keys'),
  ('Katy Perry'),
  ('Juicy J'),
  ('Maroon 5'),
  ('Christina Aguilera'),
  ('Avril Lavigne'),
  ('Destinys Child');

INSERT INTO albums
  (album_name)
VALUES
  ('Middle of Nowhere'),
  ('A Night at the Opera'),
  ('Daydream'),
  ('A Star Is Born'),
  ('Silver Side UP'),
  ('The Blueprint 3'),
  ('Prism'),
  ('HAnds All Over'),
  ('Let Go'),
  ('The Writings on the Wall');

INSERT INTO producers
  (producer_name)
VALUES
  ('Dust Brothers'),
  ('Stephen Lironi'),
  ('Roy Thomas Baker'),
  ('Walter Afanasieff'),
  ('Benjamin Rice'),
  ('Rick Parashar'),
  ('Al Shux'),
  ('MAx Martin'),
  ('Darkchild'),
  ('The Matrix'),
  ('Cirkut');


INSERT INTO songs
  (title, duration_in_seconds, release_date)
VALUES
  ('MMMBop', 238, '04-15-1997'),
  ('Bohemian Rhapsody', 355, '10-31-1975'),
  ('One Sweet Day', 282, '11-14-1995'),
  ('Shallow', 216, '09-27-2018'),
  ('How You Remind Me', 223, '08-21-2001'),
  ('New York State of Mind', 276, '10-20-2009'),
  ('Dark Horse', 215, '12-17-2013'),
  ('Moves Like Jagger', 201, '06-21-2011'),
  ('Complicated', 244, '05-14-2002'),
  ('Say My Name', 240, '11-07-1999');
