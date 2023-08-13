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
    updated_at timestamp,
    about text,
    contact text
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


--delete from event is not supported 
delete from event;

--insert data table event;
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

-- alter table category with column 'category' to 'name' by chloe
alter table category rename column category to name;

-- add column 'userImage' into table 'category' by chloe
alter table "category" add column user_image varchar(255);

--add column 'contact' into table 'event' by Brano
alter table event
add column contact text;
insert into event (contact) values 
('We offer full-service catering for any event, large or small. We understand your needs and we will cater the food to satisfy the biggerst criteria of them all, both look and taste. Do not hesitate to contact us.
1103 Exchange Tower , Kowloon Bay , KLN
You can also contact us by phone 12345678 or email showshow@gmail.com, or you can send us a message here');

-- add column 'message' into table 'participants_events' by Katy
alter table "participants_events" add column message text;

-- add column 'user_create_event_image' into table 'event' by chloe on 10 Aug
alter table "event" add column user_create_event_image varchar(255);


ALTER TABLE users_categories
  DROP CONSTRAINT users_preferences_preference_id_fkey,
  ADD FOREIGN KEY (category_id) REFERENCES category(id);

--add column "topup, bottom_image" into table "category" by Brano
  alter table "category" add column topup_image varchar(255);
  alter table "category" add column bottom_image varchar(255);

  update category set topup_image = 'topup-yoga.jpg' where name = 'topup-yoga';

  insert into event (name, about) values
  (
'Party room 101'
,'A party room is a designated space within a building or property
            that is specifically designed and furnished for hosting parties and
            other social gatherings. It is a place where people can come
            together to celebrate special occasions, such as birthdays,
            anniversaries, graduations, and other milestones. Party rooms are
            often equipped with various amenities to enhance the party
            experience, such as a sound system, lighting, and decorations. They
            may also have tables and chairs for guests to socialize and enjoy
            refreshments. Some party rooms are located within restaurants,
            hotels, or event venues, while others are standalone spaces that can
            be rented out for private events. They can range in size from small,
            intimate rooms to large banquet halls that can accommodate hundreds
            of guests. Overall, party rooms provide a convenient and enjoyable
            way to host a celebration without having to worry about the
            logistics of setting up and cleaning up
'
  );

  insert into event (name, about) values
  (
    'Hiking 101'
    ,'The attendees listen attentively, eager to learn more about the event.

EVENT ORGANIZER
We have carefully selected a picturesque trail that will take us through lush forests, stunning viewpoints, and breathtaking landscapes. Its an opportunity to reconnect with nature and challenge ourselves.

VISUAL MONTAGE:

Footage of hikers walking through serene forests.
Aerial shots of majestic mountain ranges.
Close-ups of hikers overcoming obstacles and cheering each other on.
Smiling faces enjoying the scenic beauty of waterfalls and wildflowers.'
  );

insert into event (name, about) values
(
    'Music 101'
    ,'Get ready to let the music move you, to dance like nobodys watching, and to create memories that will last a lifetime. The Harmony Festival awaits you!

    The crowd cheers with excitement, eagerly anticipating the unforgettable music event.
    Remember to adapt the script to match the specifics of your music event, including event details, dates, and any additional information you want to convey. Let the music unite and the magic unfold!'
);

insert into event (name, about) values
(
 'VR Game 101'
 ,'The Quest for the Enchanted Realm will be available for play starting [Game Release Date]. Make sure to reserve your gaming slots in advance to secure your place in this epic adventure.
 The gamers applaud and eagerly discuss their plans to reserve their slots for the game release.
 Remember to come dressed comfortably and be ready to embark on an unforgettable virtual journey. Get ready to experience Virtual Adventures like never before!
 The gamers cheer with anticipation, eager to step into the virtual realm and embark on their epic quests.'
);

insert into event (name, about) values
(
 'War Game 101'
 ,'Our game plunges you into the heart of epic battles across historical and fictional war zones. Prepare to experience the thrill of combat, the camaraderie of a united force, and the triumph of valor in the face of adversity.
 Clips of players gripping their controllers, their eyes locked on the screen.
Intense battle scenes showcasing explosions, gunfire, and tactical maneuvers.
Players coordinating their movements, formulating plans, and executing precise strategies.
Close-ups of players reactions, displaying determination, excitement, and adrenaline-fueled intensity.'
);