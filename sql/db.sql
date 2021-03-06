--CREATE DATABASE sismoschile;

CREATE TABLE IF NOT EXISTS usuario(
    id_usuario integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre text NOT NULL,
    correo text NOT NULL,
    password text NOT NULL
);

CREATE TABLE IF NOT EXISTS sismos(
    id_sismo integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    fecha_local text,
    fecha_utc text,
    latitud text,
    longitud text,
    profundidad text,
    magnitud text,
    agencia text,
    referencia_geografica text
);