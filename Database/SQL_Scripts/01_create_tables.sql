-- CREATE TABLES
-- UrgencyType
-- EventType
-- LocationType
-- Area
-- Location
-- User
CREATE TABLE User (
    id INTEGER NOT NULL AUTO_INCREMENT,
    firstName VARCHAR (200) NOT NULL,
    lastName VARCHAR (200) NOT NULL,
    email VARCHAR (320) NOT NULL UNIQUE,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT PK_User PRIMARY KEY (id)
) ENGINE = InnoDB;

/*ENGINE=MYISAM*/
ALTER TABLE
    User AUTO_INCREMENT = 1001;

-- AreaUser     (NOT area_user anymore!)
CREATE TABLE AreaUser (
    areaId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    CONSTRAINT PK_AreaUser PRIMARY KEY (areaId, userId),
    /*INDEX AreaUser_Area (userId), */
    CONSTRAINT FK_AreaUser_Area FOREIGN KEY (areaId) REFERENCES Area (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    /* we cannot update or change any userId or areaId */
    CONSTRAINT FK_AreaUser_User FOREIGN KEY (userId) REFERENCES User (id) ON
    DELETE CASCADE ON
    DELETE RESTRICT
) ENGINE = InnoDB;

/*ENGINE=MYISAM*/
-- Event