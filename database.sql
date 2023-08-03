CREATE DATABASE "showshow";

CREATE TABLE "user" (
    id serial primary key,
    email varchar(64) not null,
    password varchar(64) not null,
    role integer not null,
    created_at timestamp not null,
    updated_at timestamp
)

