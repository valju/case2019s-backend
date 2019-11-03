-- CREATE TABLES
-- UrgencyType
CREATE TABLE UrgencyType (
                             id INTEGER NOT NULL,
                             name VARCHAR(200) NOT NULL UNIQUE,
                             description VARCHAR(20000),
                             CONSTRAINT PK_UrgencyType PRIMARY KEY (id)
) ENGINE = InnoDB;
-- EventType
CREATE TABLE EventType (
                           id INTEGER NOT NULL AUTO_INCREMENT,
                           name VARCHAR(200) NOT NULL UNIQUE,
                           description VARCHAR(20000),
                           defaultUrgency INTEGER NOT NULL,
                           CONSTRAINT PK_EventType PRIMARY KEY (id),
                           CONSTRAINT FK_EventType_UrgencyType FOREIGN KEY (defaultUrgency) REFERENCES UrgencyType(id) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB;
-- LocationType
CREATE TABLE LocationType (
                              id INTEGER NOT NULL AUTO_INCREMENT,
                              name VARCHAR(320) NOT NULL UNIQUE,
                              description VARCHAR(20000),
                              isCommonAreaType BOOLEAN NOT NULL DEFAULT TRUE,
                              isAdminArea BOOLEAN NOT NULL DEFAULT FALSE,
                              CONSTRAINT PK_LocationType PRIMARY KEY (id)
) ENGINE = InnoDB;
ALTER TABLE
    LocationType AUTO_INCREMENT = 21;
-- Area
CREATE TABLE Area (
                      id INTEGER NOT NULL AUTO_INCREMENT,
                      name VARCHAR(320) NOT NULL UNIQUE,
                      description VARCHAR(20000),
                      isCommonArea BOOLEAN NOT NULL DEFAULT TRUE,
                      CONSTRAINT PK_Area PRIMARY KEY (id)
) ENGINE = InnoDB;
ALTER TABLE
    Area AUTO_INCREMENT = 101;
-- Location
CREATE TABLE Location (
                          id INTEGER NOT NULL AUTO_INCREMENT,
                          areaId INTEGER NOT NULL,
                          name VARCHAR(320) NOT NULL UNIQUE,
                          description VARCHAR(20000),
                          surfaceArea DECIMAL(5, 2) NOT NULL,
                          locationTypeId INTEGER NOT NULL,
                          CONSTRAINT PK_Location PRIMARY KEY (id),
                          CONSTRAINT FK_Location_Area FOREIGN KEY (areaId) REFERENCES Area (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
                          CONSTRAINT FK_Location_LocationType FOREIGN KEY (locationTypeId) REFERENCES LocationType (id) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB;
ALTER TABLE
    Location AUTO_INCREMENT = 201;
-- Users
CREATE TABLE Users (
                       id INTEGER NOT NULL AUTO_INCREMENT,
                       firstName VARCHAR(200) NOT NULL,
                       lastName VARCHAR (200) NOT NULL,
                       email VARCHAR (320) NOT NULL UNIQUE,
                       isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
                       CONSTRAINT PK_Users PRIMARY KEY (id)
) ENGINE = InnoDB;
ALTER TABLE
    Users AUTO_INCREMENT = 1001;
-- AreaUser     (NOT area_user anymore!)
CREATE TABLE AreaUser (
                          areaId INTEGER NOT NULL,
                          userId INTEGER NOT NULL,
                          CONSTRAINT PK_AreaUser PRIMARY KEY (areaId, userId),
                          CONSTRAINT FK_AreaUser_Area FOREIGN KEY (areaId) REFERENCES Area (id) ON DELETE CASCADE ON UPDATE RESTRICT,
                          CONSTRAINT FK_AreaUser_User FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB;


ALTER TABLE
    EventType AUTO_INCREMENT = 11;
-- Event
CREATE TABLE Event (
                       id INTEGER NOT NULL AUTO_INCREMENT,
                       locationId INTEGER NOT NULL UNIQUE,
                       eventTypeId INTEGER NOT NULL UNIQUE,
                       eventTimestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       valueText VARCHAR(20000) NOT NULL,
                       valueInt INTEGER,
                       valueDecimal DECIMAL(19, 4),
                       valueBoolean BOOLEAN,
                       changedUrgency INTEGER NOT NULL UNIQUE,
                       isHandled BOOLEAN DEFAULT FALSE,
                       CONSTRAINT PK_Event PRIMARY KEY (id),
                       CONSTRAINT FK_Event_Location  FOREIGN KEY (locationId) REFERENCES Location (id) ON DELETE CASCADE ON UPDATE RESTRICT,
                       CONSTRAINT FK_Event_EventType FOREIGN KEY (eventTypeId) REFERENCES EventType (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
                       CONSTRAINT FK_Event_Urgency FOREIGN KEY (changedUrgency) REFERENCES UrgencyType (id) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB;
ALTER TABLE
    Event AUTO_INCREMENT = 10001;


