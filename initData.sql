--- user ---
insert into "user" (email, password, created_at, updated_at, role) values 
('amy@gmail.com', 'Aaaa1111', now(), now(), 'member'),
('bob@gmail.com', 'Bbbb1111', now(), now(), 'member'),
('chris@gmail.com', 'Cccc1111', now(), now(), 'member');

--- event ---
insert into event (name, creator_id, event_date, event_time, agency, venue, vacancy, quota, status, created_at, updated_at, category_id) values
('Hiking at Lion Rock', 1, '2023-08-06', '13:00:00', 'AAA Agency', 'Lion Rock', 10, 10, 'active', now(), now(), 1),
('Hiking at Tai Mo Shan', 2, '2023-08-16', '14:00:00', 'BBB Agency', 'Tai Mo Shan', 5, 5, 'active', now(), now(), 1),
('Hiking at Victoria Peak', 3, '2023-08-17', '15:00:00', 'CCC Agency', 'Victoria Peak', 7, 7, 'active', now(), now(), 1),
('Music at Victoria Peak', 1, '2023-08-27', '16:00:00', 'CCC Agency', 'Victoria Peak', 7, 7, 'active', now(), now(), 2);


--- category ---
insert into category


--- participants_events ---
insert into participants_events (user_id, event_id, created_at, updated_at) values
(2, 1, now(), now()),
(12, 1, now(), now());


--- users_categories ---

