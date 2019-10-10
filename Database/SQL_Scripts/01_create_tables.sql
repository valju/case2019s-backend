-- CREATE TABLES

-- UrgencyType

-- EventType

-- LocationType

-- Area

-- Location

-- User

-- AreaUser     (NOT area_user anymore!)

-- Event
CREATE TABLE Event (
	id						INTEGER		NOT NULL		AUTO_INCREMENT,
	locationId				INTEGER		NOT NULL 		UNIQUE,
	eventTypeId 	        INTEGER 	NOT NULL 		UNIQUE	,
	eventTimestamp 	        DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
	valueText			    VARCHAR(20000)	NOT NULL,
    valueInt                INTEGER,
    valueDecimal            DECIMAL(19,4),
    valueBoolean            BOOLEAN,
    changedUrgency          INTEGER,
    isHandled               BOOLEAN  DEFAULT FALSE,

	CONSTRAINT PK_Event PRIMARY KEY (id)
    
	CONSTRAINT FK_Event_Location
		FOREIGN KEY (locationId) REFERENCES Location (id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	CONSTRAINT FK_Event_EventType
		FOREIGN KEY (eventTypeId) REFERENCES EventType (id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
    CONSTRAINT FK_Event_Urgency
		FOREIGN KEY (changedUrgency) REFERENCES UrgencyType (id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT

) ENGINE=InnoDB;
ALTER TABLE Event AUTO_INCREMENT=10001;