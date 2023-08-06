CREATE DATABASE "showshow";
\c showshow

CREATE TABLE "user" (
    id serial primary key,
    email varchar(64) not null,
    password varchar(64) not null,
    role integer not null,
    created_at timestamp not null,
    updated_at timestamp not null
);

create type statusEnum as enum ('active', 'expired', 'cancelled');

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
    updated_at timestamp
);

CREATE TABLE "preference" (
    id serial primary key,
    category varchar(60),
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

CREATE TABLE "users_preferences" (
    id serial primary key,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    preference_id integer,
    FOREIGN KEY (preference_id) REFERENCES "preference"(id),
    created_at timestamp not null,
    updated_at timestamp not null
);

-- 1 -> member
-- 2 -> admin

create type roleEnum as enum ('admin', 'member');

alter TABLE "user"
add column roleEnum roleEnum;

update "user"
set roleEnum = 'admin'
where role = 2;

update "user"
set roleEnum = 'member'
where role = 1;

alter TABLE "user"
drop column role;

alter table "user"
rename column roleEnum to role;

alter type roleEnum rename to user_role;

alter TABLE "user"
alter column role set not null;

-- ADDED BY KATY ON 5 AUG 2023
-- change preference to category
alter TABLE preference
rename to category;

ALTER SEQUENCE preference_id_seq RENAME TO category_id_seq;

alter TABLE users_preferences
rename to users_categories;

ALTER SEQUENCE users_preferences_id_seq RENAME TO users_categories_id_seq;

alter TABLE users_categories
rename column preference_id to category_id;

-- ADDED BY KATY ON 6 AUG 2023
-- add column category_id to table event and insert data
ALTER TABLE event
ADD COLUMN category_id integer REFERENCES "category"(id);

-- demo data for table event
insert into event (name, creator_id, event_date, event_time, agency, venue, vacancy, quota, status, created_at, updated_at)
values ('Hiking at Lion Rock', 1, '2023-08-06', '13:00:00', null, 'Lion Rock', 10, 10, 'active', now(), now()),
('Hiking at Tai Mo Shan', 2, '2023-08-16', '13:00:00', null, 'Tai Mo Shan', 5, 5, 'active', now(), now()),
('Hiking at Victoria Peak', 2, '2023-08-17', '13:00:00', null, 'Victoria Peak', 7, 7, 'active', now(), now());


