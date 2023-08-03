CREATE DATABASE "showshow";

CREATE TABLE "user" (
    id serial primary key,
    email varchar(64) not null,
    password varchar(64) not null,
    role integer not null,
    created_at timestamp not null,
    updated_at timestamp
)

<<<<<<< HEAD
=======
CREATE table "event"(
    id serial primary key,
    name varchar(255)
    creator_id integer,
    foreign key (creator_id) references user(id),
    event_date date,
    event_time time,
    agency varchar(64),
    venue  varchar(255),
    vacancy integer,
    quota integer,
    status enum('active', 'expired', 'cancelled')
    created_at timestamp,
    updated_at timestamp,
);

CREATE TABLE "participants_events" (
    id serial primary key,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (event_id) REFERENCES event(id,)
    created_at timestamp not null,
    updated_at timestamp not null
);

CREATE TABLE "users_preferences" (
    id serial primary key,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (preference_id) REFERENCES preference(id),
    created_at timestamp not null,
    updated_at timestamp not null
);
>>>>>>> 908c8ca5b6a335725e9136fb048ea53da864d89c
