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

-- start from 7 Aug
-- update event table
alter table event
add column about text;

delete from event;
insert into event
(name, about, venue)
values
(
 'yoga101'
,'
Yoga is an ancient practice that originated in India over 5,000 years ago. It is a holistic system that emphasizes the union of the mind, body, and spirit. The word "yoga" comes from the Sanskrit word "yuj," which means to yoke or unite.
Yoga includes a variety of practices, such as physical postures (asanas), breathing exercises (pranayama), meditation, and ethical guidelines. The physical postures, or asanas, are the most commonly known aspect of yoga in the West. They are designed to strengthen and stretch the body while promoting relaxation and reducing stress.
Yoga has numerous health benefits, both physical and mental. It can improve flexibility, balance, strength, and endurance, as well as reduce the risk of chronic diseases such as heart disease, diabetes, and high blood pressure. Yoga is also effective in reducing stress, anxiety, and depression and promoting mental well-being.
There are many different styles of yoga, each with its own unique approach and focus. Some popular types of yoga include Hatha yoga, Vinyasa yoga, Bikram yoga, and Kundalini yoga.
Yoga can be practiced by people of all ages and fitness levels. It is a non-competitive practice that encourages self-awareness, self-acceptance, and self-care. With regular practice, yoga can help individuals lead a more balanced, peaceful, and healthy life.
'
,'1103 Exchange Tower , Kowloon Bay , KLN'
);

-- add column 'image' into table 'category' by chloe
alter table "category" add column image varchar(255);

-- insert info into table category
insert into "category" (category, created_at, updated_at, image) values 
($1, $2, $3, $4), ($5, $6, $7, $8), ($9, $10, $11, $12), ($13, $14, $15, $16), ($17, $18, $19, $20), ($21, $22, $23, $24)


    