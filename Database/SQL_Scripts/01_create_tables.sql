-- CREATE TABLES

-- UrgencyType
CREATE TABLE UrgencyType (
    id INTEGER NOT NULL,
    name VARCHAR(200) NOT NULL UNIQUE,
    description VARCHAR(20000),
    CONSTRAINT PK_UrgencyType PRIMARY KEY (id)
) ENGINE = InnoDB;

-- EventType

-- LocationType

-- Area

-- Location

-- User

-- AreaUser     (NOT area_user anymore!)

-- Event
