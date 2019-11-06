-- TEST QUERIES

-- Event

-- AreaUser
SELECT * FROM AreaUser ORDER BY areaID ASC;

SELECT COUNT (DISTINCT areaID) FROM AreaUser;

-- User
SELECT * FROM User ORDER BY id DESC;

SELECT firstName FROM User WHERE firstName LIKE 'b%';

SELECT * FROM User WHERE id IN (SELECT userId FROM AreaUser);

SELECT lastName FROM User WHERE lastName LIKE '%a';

SELECT email from User WHERE email LIKE '%gmail.com';

-- Location

-- Area

-- LocationType

-- EventType
DESCRIBE EventType;
SELECT * FROM EventType;

SELECT description FROM EventType WHERE name LIKE 'Fire';

SELECT * FROM EventType WHERE defaultUrgency IN (SELECT id FROM UrgencyType);

-- UrgencyType
DESCRIBE UrgencyType;
SELECT * FROM UrgencyType;
