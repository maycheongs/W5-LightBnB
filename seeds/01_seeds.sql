INSERT INTO users (name, email, password)
VALUES ('Brielle Webb', 'webb@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Brielle Webb', 'webb@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Naveed Joyce', 'joyce@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Youssef Hewitt', 'youss@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Milo Haworth', 'milo@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')
;

INSERT INTO properties (
owner_id, 
title, 
description,
thumbnail_photo_url,
cover_photo_url,
cost_per_night,
parking_spaces,
number_of_bathrooms,
number_of_bedrooms,
country,
street,
city,
province,
post_code
)

VALUES (
1,
'Title 1',
'Description 1',
'thumb url',
'cover url',
80,
1,
2,
2,
'CANADA',
'1078 Bayfield St',
'Midland',
'Ontario',
'L4S 1V5'
),
(
2,
'Title 2',
'Description 2',
'thumb url',
'cover url',
100,
2,
2,
3,
'CANADA',
'1104 Maynard Rd',
'Calgary',
'Alberta',
'T2E 6J8'
),
(
1,
'Title 3',
'Description 3',
'thumb url',
'cover url',
60,
1,
1,
1,
'UK',
'45 Sloe Lane',
'Cudliptown',
'NA',
'PL19 5YY'
),
(
2,
'Title 4',
'Description 4',
'thumb url',
'cover url',
100,
1,
2,
2,
'USA',
'4927 Stout Street',
'Denver',
'Colorado',
'802603'
);

INSERT INTO reservations (guest_id,property_id,start_date,end_date)
VALUES (1,2, '2018-09-11','2018-09-13'),
(2,3,'2019-01-04', '2019-02-01'),
(2,2,'2020-02-03','2020-02-11');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1,2,1,4,'message 1'),
(2,3,2,3,'message 2'),
(2,2,3,5,'message 3');



