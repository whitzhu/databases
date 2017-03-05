CREATE DATABASE chat;

USE chat;

-- CREATE TABLE messages (
--   /* Describe your table here.*/

-- );

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/




-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users_Table'
--
-- ---

DROP TABLE IF EXISTS `Users_Table`;

CREATE TABLE `Users_Table` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `User_Name` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Msg_Table'
--
-- ---

DROP TABLE IF EXISTS `Msg_Table`;

CREATE TABLE `Msg_Table` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `Message` VARCHAR(140) NULL DEFAULT NULL,
  `Time` DATETIME(6) NULL DEFAULT NULL,
  `id_Users_Table` INTEGER NULL DEFAULT NULL,
  `id_Room_Table` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Room_Table'
--
-- ---

DROP TABLE IF EXISTS `Room_Table`;

CREATE TABLE `Room_Table` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `Room_Name` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Msg_Table` ADD FOREIGN KEY (id_Users_Table) REFERENCES `Users_Table` (`id`);
ALTER TABLE `Msg_Table` ADD FOREIGN KEY (id_Room_Table) REFERENCES `Room_Table` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users_Table` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Msg_Table` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Room_Table` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users_Table` (`id`,`User_Name`) VALUES
-- ('','');
-- INSERT INTO `Msg_Table` (`id`,`Message`,`Time`,`id_Users_Table`,`id_Room_Table`) VALUES
-- ('','','','','');
-- Ro
-- ('','');
