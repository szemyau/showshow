CREATE DATABASE "showshow";

CREATE TABLE "user" (
    id serial primary key,
    email varchar(64) not null,
    password varchar(64) not null,
    role integer not null,
    created_at timestamp not null,
    updated_at timestamp not null
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
