-- INSERT TEST DATA

-- UrgencyType
INSERT INTO
  UrgencyType (id, name, description)
VALUES
  (30, 'low', 'The value is low'),
  (20, 'medium', 'The value is medium'),
  (10, 'high', 'The value is high');

-- EventType

-- LocationType
INSERT INTO LocationType
(name, description, isCommonAreaType, isAdminArea)
VALUES
('Kitchen', 'Room for storing and preparing food.', FALSE, FALSE),
('Gym', 'Gym accessible to all tenands.', TRUE, FALSE),
('Electrical room', 'Room or space in a building dedicated to electrical equipment.', FALSE, TRUE),
('Hallway', 'A long narrow passage inside a building with doors along it leading to rooms.', TRUE, FALSE),
('Info panel', 'Panel on a wall of a hallway where information for the tenands is shown. Can only be accessed by admins.', TRUE, TRUE)
;

-- Area
INSERT INTO Area
(name, description, isCommonArea)
VALUES
('Rooftop', 'The outer surface of a buildings roof.', FALSE),
('1st Floor', 'The bottom floor of a building, the entrance is located here.', TRUE),
('Basement', 'The floor of a building which is partly or entirely below ground level.', TRUE),
('4th floor', 'Fourth floor of a building.', TRUE),
('Bike storage', 'Secured storage location for tenands bikes.', TRUE)
;

-- Location
INSERT INTO Location
(areaId, name, description, surfaceArea, locationTypeId)
VALUES
(103, 'Shared Gym', 'Shared gym accessible to all tenands', 120.50, 22),
(103, 'Electrical room', 'Room with electrical equipment for entire house.', 75.00, 23),
(104, '4th floor Hallway', 'Hallway for the fourth floor. Doors to all appartments on the floor are located here.', 80.25, 24)
;

-- User

-- AreaUser     (NOT area_user anymore!)

-- Event
INSERT INTO Event
  (locationId, eventTypeId, eventTimestamp, valueText, valueInt, valueDecimal, valueBoolean, changedUrgency, isHandled)
VALUES
  (201, 11, '2019-10-09 09:08:22', 'Gas leak on location A', NULL, NULL, TRUE, TRUE, FALSE),
  (202, 12, '2019-10-09 13:12:31', 'Broken heating system on location B', NULL, NULL, TRUE, TRUE, TRUE),
  (203, 13, '2019-10-10 15:15:46', 'Lost electricity on location C', NULL, NULL, TRUE, TRUE, TRUE),
  (204, 14, '2019-10-15 13:08:22', 'Ventilation malfunction on location D', NULL, NULL,TRUE, TRUE, FALSE),
  (205, 15, '2019-11-24 00:00:00', 'Fire on location E', NULL, NULL, TRUE, TRUE, FALSE)
;