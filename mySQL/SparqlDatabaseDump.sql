-- MySQL dump 10.16  Distrib 10.1.19-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `sparqldb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sparqldb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `sparqldb`;

--
-- Table structure for table `sparql_results`
--

DROP TABLE IF EXISTS `sparql_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sparql_results` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `location` varchar(50) NOT NULL,
  `results` varchar(1000) NOT NULL,
  `date_entered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sparql_results`
--

LOCK TABLES `sparql_results` WRITE;
/*!40000 ALTER TABLE `sparql_results` DISABLE KEYS */;
INSERT INTO `sparql_results` VALUES (1,'Cardiff','results','2017-01-19 22:06:53'),(2,'Cardiff','hello hello','2017-01-19 22:12:26');
/*!40000 ALTER TABLE `sparql_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sparql_results2`
--

DROP TABLE IF EXISTS `sparql_results2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sparql_results2` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `location` varchar(50) NOT NULL,
  `criteria` varchar(30) NOT NULL,
  `results` varchar(2000) NOT NULL,
  `date_entered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lat` varchar(10) NOT NULL,
  `longi` varchar(10) NOT NULL,
  `mapMarkers` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sparql_results2`
--

LOCK TABLES `sparql_results2` WRITE;
/*!40000 ALTER TABLE `sparql_results2` DISABLE KEYS */;
INSERT INTO `sparql_results2` VALUES (1,'Cardiff','Shopping','Results<br>Capitol Centre<br>Queens Arcade<br>St David\'s, Cardiff<br>Mermaid Quay','2017-01-20 11:25:39','51.4636','-3.16504','[object Object],[object Object],[object Object],[object Object]'),(2,'Glasgow','Shopping','Results<br>Silverburn Centre<br>The Forge Shopping Centre<br>St. Enoch Centre<br>Glasgow Fort','2017-01-20 11:30:58','55.8712','-4.1367','[object Object],[object Object],[object Object],[object Object]');
/*!40000 ALTER TABLE `sparql_results2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-20 12:24:34
