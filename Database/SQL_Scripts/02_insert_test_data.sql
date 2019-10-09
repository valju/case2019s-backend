-- INSERT TEST DATA

-- UrgencyType

-- EventType

-- LocationType
INSERT INTO LocationType
(name, description, isCommonAreaType, isAdminArea)
VALUES
('Kitchen', 'Room for storing and preparing food.', FALSE, FALSE),
('Gym', 'Gym accessible to all tenands.', TRUE, FALSE),
('Electrical room', 'Room or space in a building dedicated to electrical equipment.', FALSE, TRUE),
('Hallway', 'A long narrow passage inside a building with doors along it leading to rooms.'),
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
