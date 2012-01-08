-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	5.0.51b-community-nt-log

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
-- Not dumping tablespaces as no INFORMATION_SCHEMA.FILES table on this server
--

--
-- Current Database: `project`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `project` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `project`;

--
-- Table structure for table `tbl_acc_list`
--

DROP TABLE IF EXISTS `tbl_acc_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_acc_list` (
  `idtbl_acc_list` int(11) NOT NULL auto_increment,
  `acc_num` varchar(6) NOT NULL,
  `acc_name` varchar(25) NOT NULL,
  `type_no` varchar(3) NOT NULL,
  PRIMARY KEY  (`idtbl_acc_list`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_acc_list`
--

LOCK TABLES `tbl_acc_list` WRITE;
/*!40000 ALTER TABLE `tbl_acc_list` DISABLE KEYS */;
INSERT INTO `tbl_acc_list` VALUES (1,'1-1000','Kas di bank','1-1'),(2,'1-2000','Piutang','1-2'),(3,'1-3100','Asuransi dibayar dimuka','1-3'),(4,'1-3200','Sewa dibayar dimuka','1-3'),(5,'1-4100','Peralatan kantor','1-4'),(6,'1-4200','Akum dep peralatan kantor','1-4'),(7,'1-4400','Akum dep kendaraan','1-4');
/*!40000 ALTER TABLE `tbl_acc_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_acc_type`
--

DROP TABLE IF EXISTS `tbl_acc_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_acc_type` (
  `idtbl_acc_type` int(11) NOT NULL auto_increment,
  `type_no` varchar(3) default NULL,
  `acc_type` varchar(25) default NULL,
  PRIMARY KEY  (`idtbl_acc_type`),
  UNIQUE KEY `acc_type_no_UNIQUE` (`type_no`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_acc_type`
--

LOCK TABLES `tbl_acc_type` WRITE;
/*!40000 ALTER TABLE `tbl_acc_type` DISABLE KEYS */;
INSERT INTO `tbl_acc_type` VALUES (1,'1-2','Account Receivable'),(2,'1-1','BANK'),(3,'1-3','Other Current Asset'),(4,'1-4','Fixed Asset'),(7,'1-6','Fixed Assets'),(17,'2-3','Long Term Liability'),(16,'2','Fixed Assets'),(10,'2-4','Other Liability'),(11,'2-5','Fixed Assets'),(12,'2-6','Fixed Assets'),(18,'1-5','Other Asset'),(19,'2-1','Account Payable'),(20,'2-2','Other Current Liability');
/*!40000 ALTER TABLE `tbl_acc_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_index`
--

DROP TABLE IF EXISTS `tbl_index`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_index` (
  `idindex` int(11) NOT NULL auto_increment,
  `index_no` varchar(1) NOT NULL,
  `cash_type` varchar(10) NOT NULL,
  PRIMARY KEY  (`idindex`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_index`
--

LOCK TABLES `tbl_index` WRITE;
/*!40000 ALTER TABLE `tbl_index` DISABLE KEYS */;
INSERT INTO `tbl_index` VALUES (1,'1','Operating'),(2,'2','Investing'),(3,'3','Funding');
/*!40000 ALTER TABLE `tbl_index` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_user` (
  `idtbl_user` int(11) NOT NULL auto_increment,
  `f_name` varchar(45) NOT NULL,
  `l_name` varchar(45) default NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(50) NOT NULL,
  `create` datetime NOT NULL,
  `update` datetime NOT NULL,
  PRIMARY KEY  (`idtbl_user`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'Andy','Suwito','andylah','e59e23c26a516d1b9dd7c90671c0a26a','2011-11-26 00:00:00','2011-12-06 00:00:00'),(2,'Andy','Suwito','andylah1982','040b7cf4a55014e185813e0644502ea9','2011-11-27 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-12-12 23:36:00
