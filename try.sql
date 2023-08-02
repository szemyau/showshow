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
role integer
created_at timestamp
updated_at timestamp


event
----
id pk
creator_id fk >- user.id
name text
preference_id fk >- preference.id
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
preference_id fk >- preference.id
created_at timestamp
updated_at timestamp


# user (497, 355)
# view: (0, 0)
# event (864, 639)
# preference (146, 136)
# users_preferences (478, 136)
# zoom: 0.900
# participants_events (867, 352)