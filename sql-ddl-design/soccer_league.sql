DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE seasons
(
    id SERIAL PRIMARY KEY,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL
);

CREATE TABLE referees
(
    id SERIAL PRIMARY KEY,
    ref_name TEXT
);

CREATE TABLE teams
(
    id SERIAL PRIMARY KEY,
    team_name TEXT
);

CREATE TABLE players
(
    id SERIAL PRIMARY KEY,
    player_name TEXT,
    team_id INTEGER REFERENCES teams
);

CREATE TABLE matches
(
    id SERIAL PRIMARY KEY,
    home_team_id INTEGER REFERENCES teams,
    away_team_id INTEGER REFERENCES teams,
    ref_id INTEGER REFERENCES referees,
    season_id INTEGER REFERENCES seasons,
    mdate TEXT NOT NULL
);

CREATE TABLE goals
(
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players,
    match_id INTEGER REFERENCES matches
);

CREATE TABLE game_results
(
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams,
    match_id INTEGER REFERENCES matches,
    result TEXT NOT NULL
);

INSERT INTO seasons
    (start_date,end_date)
VALUES
    ('2022-01-01', ('2022-11-11'));

INSERT INTO referees
    (ref_name)
VALUES
    ('Ed Hochuli'),
    ('Herb Dean'),
    ('Mike Dean');

INSERT INTO teams
    (team_name)
VALUES
    ('Manchester United'),
    ('Arsenal'),
    ('Chelsea'),
    ('Liverpool'),
    ('Newcastle'),
    ('Watford');

INSERT INTO players
    (player_name, team_id)
VALUES
    ('Lionel Messi', 1),
    ('Cristiano Ronaldo', 2),
    ('Neymar', 3),
    ('Pele', 4),
    ('Diego Maradona', 5),
    ('Luis Suarez', 6),
    ('Virgil van Dijk', 1);

INSERT INTO matches
    (home_team_id, away_team_id, ref_id, season_id, mdate)
VALUES
    (1,2,1,1,'2022-01-01'),
    (3,4,2,1,'2022-02-02'),
    (5,6,3,1, '2022-03-03');

INSERT INTO goals
    (player_id,match_id)
VALUES
    (1,1),
    (3,2),
    (5,3);

INSERT INTO game_results
    (team_id,match_id,result)
VALUES
    (1,1,'win'),
    (2,1, 'loss'),
    (3,2, 'win'),
    (4,2, 'loss'),
    (5,3, 'win'),
    (6,3, 'loss');