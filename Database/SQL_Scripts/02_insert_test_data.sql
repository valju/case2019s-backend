-- INSERT TEST DATA
-- UrgencyType
-- EventType
-- LocationType
-- Area
-- Location
-- User
INSERT INTO
    USER
    (firtsName, lastName, email, isAdmin)
VALUES
    ('John', 'Smith', 'jsmith@gmail.com', TRUE),
    ('Juhani', 'Nurminen', 'jnurmi@mail.com', FALSE),
    ('Anu', 'Karisto', 'akaris@yandex.com', FALSE),
    ('Marie', 'Lin', 'mlin@hotmail.com', TRUE),
    ('Nick', 'Brown', 'nickboy@gmail.com', FALSE),
    ('Hari', 'Xhetri', 'xhetri@gmail.com', FALSE);

-- AreaUser     (NOT area_user anymore!)
INSERT INTO
    AreaUser
    (areaId, userID)
VALUES
    (1001, 102),
    (1002, 103),
    (1002, 101),
    (1003, 105),
    (1003, 104),
    (1003, 101);

-- Event