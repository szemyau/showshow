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

-- already changed the table name from preference to category
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

alter table users_categories rename preference_id to category_id;

-- ADDED BY KATY ON 6 AUG 2023
-- add column category_id to table event and insert data
ALTER TABLE event
ADD COLUMN category_id integer REFERENCES "category"(id);

-- demo data for table event
insert into event (name, creator_id, event_date, event_time, agency, venue, vacancy, quota, status, created_at, updated_at)
values ('Hiking at Lion Rock', 1, '2023-08-06', '13:00:00', null, 'Lion Rock', 10, 10, 'active', now(), now()),
('Hiking at Tai Mo Shan', 2, '2023-08-16', '13:00:00', null, 'Tai Mo Shan', 5, 5, 'active', now(), now()),
('Hiking at Victoria Peak', 2, '2023-08-17', '13:00:00', null, 'Victoria Peak', 7, 7, 'active', now(), now());





-- UP-TO-DATE FINAL VERSION
# Visualize on https://erd.surge.sh
#
# Relationship Types
#  -    - one to one
#  -<   - one to many
#  >-   - many to one
#  >-<  - many to many
#  -0   - one to zero or one
#  0-   - zero or one to one
#  0-0  - zero or one to zero or one
#  -0<  - one to zero or many
#  >0-  - zero or many to one
#
////////////////////////////////////


user
----
id pk
email varchar(64)
password varchar(64)
role enum('admin','member')
created_at timestamp
updated_at timestamp


event
----
id pk
creator_id fk >- user.id
name text
category_id fk >- category.id
date date
time time
agency varchar(64)
venue varchar(64)
vacancy integer
quota integer
status enum('active','expired','cancelled')
created_at timestamp
updated_at timestamp


preference
-----
id pk
category integer
created_at timestamp
updated_at timestamp


participants_events
-----
id pk
user_id fk >- user.id
event_id fk >- event.id
created_at timestamp
updated_at timestamp


users_preferences
-----
id pk
user_id fk >- user.id
category_id fk >- category.id
created_at timestamp
updated_at timestamp


# user (497, 355)
# view: (0, 0)
# event (864, 639)
# preference (146, 136)
# users_preferences (478, 136)
# zoom: 0.900
# participants_events (867, 352)
-- just take a look on updated table on 6 Aug by chloe
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
