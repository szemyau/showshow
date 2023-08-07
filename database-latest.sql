CREATE TABLE "user" (
    id serial primary key,
    email varchar(64) not null,
    password varchar(64) not null,
    role user_role not null,
    created_at timestamp not null,
    updated_at timestamp not null
);

CREATE table "event"(
    id serial primary key,
    name varchar(255),
    creator_id integer,
    foreign key (creator_id) references "user"(id),
    event_date date,
    event_time time,
    agency varchar(64),
    venue  varchar(255),
    vacancy integer,
    quota integer,
    status statusEnum default 'active',
    created_at timestamp,
    updated_at timestamp,
    category_id integer REFERENCES "category"(id)
);

CREATE TABLE "category" (
    id serial primary key,
    category varchar(60),
    created_at timestamp not null,
    updated_at timestamp not null
);

CREATE TABLE "users_categories" (
    id serial primary key,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    category_id integer,
    FOREIGN KEY (category_id) REFERENCES "category"(id),
    created_at timestamp not null,
    updated_at timestamp not null
);

CREATE TABLE "participants_events" (
    id serial primary key,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    event_id integer,
    FOREIGN KEY (event_id) REFERENCES "event"(id),
    created_at timestamp not null,
    updated_at timestamp not null
);
