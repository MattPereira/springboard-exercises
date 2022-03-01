DROP DATABASE IF EXISTS  hospital;

CREATE DATABASE hospital;

\c hospital


CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    doctor_name TEXT NOT NULL,
    doctor_type TEXT,
    salary NUMERIC
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    patient_name TEXT NOT NULL,
    patient_age INTEGER,
    patient_weight NUMERIC,
    patient_height NUMERIC
);

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    disease_name TEXT NOT NULL,
    Curability BOOLEAN
);

CREATE TABLE doctor_patient (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients,
    doctor_id INTEGER REFERENCES doctors
);

CREATE TABLE diagnosis (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients,
    disease_id INTEGER REFERENCES diseases
);

INSERT INTO doctors 
    (doctor_name, doctor_type, salary)
VALUES
    ('Sigmund Freud', 'Neurologist', 100000),
    ('Joseph Lister', 'Surgeon', 200000),
    ('Alexander Fleming', 'Microbiologist', 333333);

INSERT INTO patients
    (patient_name, patient_age, patient_weight, patient_height)
VALUES
    ('Walter White', 55, 175, 73),
    ('Ruth Langmore', 55, 175, 73),
    ('Marty Byrde', 55, 175, 73),
    ('Wendy Byrde', 55, 175, 73),
    ('Wyatt Langmore', 55, 175, 73);

INSERT INTO diseases
    (disease_name,Curability)
VALUES
    ('Polio', true),
    ('Bubonic Plague', true),
    ('Cancer', false),
    ('Dementia', false),
    ('Alzheimers', false);


INSERT INTO doctor_patient
    (patient_id, doctor_id)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (3,2),
    (5,3),
    (4,1);

INSERT INTO diagnosis 
    (patient_id, disease_id)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (1,5),
    (3,1),
    (2,5),
    (4,3),
    (4,4);






