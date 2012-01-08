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
  `category` int(5) NOT NULL,
  PRIMARY KEY  (`idtbl_acc_list`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_acc_list`
--

LOCK TABLES `tbl_acc_list` WRITE;
/*!40000 ALTER TABLE `tbl_acc_list` DISABLE KEYS */;
INSERT INTO `tbl_acc_list` VALUES (1,'1-1000','Kas di bank','1-1',0),(2,'1-2000','Piutang','1-2',0),(3,'1-3100','Asuransi dibayar dimuka','1-3',0),(4,'1-3200','Sewa dibayar dimuka','1-3',0),(5,'1-4100','Peralatan kantor','1-4',0),(6,'1-4200','Akum dep peralatan kantor','1-4',0),(7,'1-4400','Akum dep kendaraan','1-4',0),(11,'2-2100','Utang Bunga','2-2',0),(10,'2-1100','Utang Usaha','2-1',1),(12,'2-2200','Utang Gaji','2-2',0),(13,'2-3100','Utang Bank','2-3',0),(14,'2-3200','Pinjaman Bank Mandiri','2-3',1),(15,'3-1100','Modal Tuan Premire','3-',1),(16,'3-2000','Prive Tuan Premire','3-',0),(17,'4-1000','Pendapatan Jasa Pengirima','4-',0),(18,'5-1000','Harga Pokok','5-',0),(19,'6-1100','Beban Gaji','6-',0),(20,'6-1200','Beban Sewa','6-',0),(21,'6-1300','Beban Asuransi','6-',0),(22,'6-1400','Beban Perlg. Kantor','6-',0),(23,'6-1500','Beban Listrik dan Air','6-',0),(24,'6-1600','Beban Dep. Peralatan Ktr','6-',0),(25,'6-1700','Beban Dep. Kendaraan','6-',0),(26,'6-1800','Beban Telepon','6-',0),(27,'6-1900','Beban Pemeliharaan','6-',0),(28,'6-2000','Beban Iklan','6-',0),(29,'8-1100','Pendapatan diluar Usaha','8-',0),(30,'9-1000','Beban Administrasi','9-',0);
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
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_acc_type`
--

LOCK TABLES `tbl_acc_type` WRITE;
/*!40000 ALTER TABLE `tbl_acc_type` DISABLE KEYS */;
INSERT INTO `tbl_acc_type` VALUES (38,'8-','Other income'),(37,'6-','Expense'),(36,'5-','Cost of Sale'),(34,'3-','Equity'),(33,'2-4','Other Liability'),(32,'2-3','Long Term Liability'),(35,'4-','Income'),(31,'2-2','Other Current Liability'),(30,'2-1','Account Payable'),(29,'1-5','Other Asset'),(28,'1-4','Fixed Asset'),(27,'1-3','Other Current Asset'),(26,'1-2','Account Receivable'),(25,'1-1','Bank'),(39,'9-','Other Expense');
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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
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
-- Table structure for table `tbl_trans`
--

DROP TABLE IF EXISTS `tbl_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_trans` (
  `idtbl_trans` int(11) NOT NULL auto_increment,
  `trans_id` varchar(20) NOT NULL,
  `trans_inv` varchar(10) default NULL,
  `trans_memo` varchar(45) default NULL,
  PRIMARY KEY  (`idtbl_trans`),
  UNIQUE KEY `trans_id_UNIQUE` (`trans_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_trans`
--

LOCK TABLES `tbl_trans` WRITE;
/*!40000 ALTER TABLE `tbl_trans` DISABLE KEYS */;
INSERT INTO `tbl_trans` VALUES (8,'T/122011/2618-5735','BKK12-10','Pemabayaran gaji minggu II'),(7,'T/122011/2618-5500','BKK12-9','Pembayaran utang PT ASIH'),(5,'T/122011/2618-0636','F12-01','Penerimaan faktur pelanggan'),(6,'T/122011/2618-5332','BKK12-8','Pembayaran biaya telpon bulan des'),(9,'T/012012/0322-1631','BKK 12-3','Pembelian peralatan kantor tunai'),(10,'T/012012/0322-1935','BKM12-1','Pinjaman Bank Mandiri');
/*!40000 ALTER TABLE `tbl_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_trans_detail`
--

DROP TABLE IF EXISTS `tbl_trans_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_trans_detail` (
  `idtbl_trans_detail` int(11) NOT NULL auto_increment,
  `trans_id` varchar(20) default NULL,
  `index_no` varchar(10) default NULL,
  `acc_num` varchar(10) default NULL,
  `debet` bigint(20) default NULL,
  `credit` bigint(20) default NULL,
  `trans_date` date default NULL,
  PRIMARY KEY  (`idtbl_trans_detail`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_trans_detail`
--

LOCK TABLES `tbl_trans_detail` WRITE;
/*!40000 ALTER TABLE `tbl_trans_detail` DISABLE KEYS */;
INSERT INTO `tbl_trans_detail` VALUES (14,'T/122011/2618-5735','1','1-1000',0,6250000,'2011-12-26'),(13,'T/122011/2618-5735','','6-1100',6250000,0,'2011-12-26'),(12,'T/122011/2618-5500','1','1-1000',0,6000000,'2011-12-26'),(11,'T/122011/2618-5500','','2-1100',6000000,0,'2011-12-26'),(7,'T/122011/2618-0636','','1-2000',7000000,0,'2011-12-26'),(8,'T/122011/2618-0636','','4-1000',0,7000000,'2011-12-26'),(9,'T/122011/2618-5332','','6-1800',1850000,0,'2011-12-26'),(10,'T/122011/2618-5332','1','1-1000',0,1850000,'2011-12-26'),(15,'T/012012/0322-1631','','1-4100',30000000,0,'2011-12-27'),(16,'T/012012/0322-1631','2','1-1000',0,30000000,'2011-12-27'),(17,'T/012012/0322-1935','3','1-1000',100000000,0,'2011-12-28'),(18,'T/012012/0322-1935','','2-3200',0,100000000,'2011-12-28');
/*!40000 ALTER TABLE `tbl_trans_detail` ENABLE KEYS */;
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

--
-- Table structure for table `temp_trans_detail`
--

DROP TABLE IF EXISTS `temp_trans_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temp_trans_detail` (
  `idtemp_trans_detail` int(11) NOT NULL auto_increment,
  `session_id` varchar(45) NOT NULL,
  `index_no` varchar(10) NOT NULL,
  `acc_num` varchar(10) NOT NULL,
  `debet` decimal(10,0) default NULL,
  `credit` decimal(10,0) default NULL,
  `trans_id` varchar(10) default NULL,
  PRIMARY KEY  (`idtemp_trans_detail`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp_trans_detail`
--

LOCK TABLES `temp_trans_detail` WRITE;
/*!40000 ALTER TABLE `temp_trans_detail` DISABLE KEYS */;
INSERT INTO `temp_trans_detail` VALUES (24,'64ebecabab0bd246b87c53b242266da2','','1-3100',10000,0,'T/122011/2'),(25,'64ebecabab0bd246b87c53b242266da2','','1-1000',0,10000,'T/122011/2'),(26,'2413a6d14dd021d6783b9112932cceb1','1','1-1000',1500,0,'T/122011/2'),(27,'2413a6d14dd021d6783b9112932cceb1','','1-2000',0,1500,'T/122011/2'),(28,'af0a7a0ad215000d7b597846f9b1ce36','','1-2000',7000000,0,'T/122011/2'),(29,'af0a7a0ad215000d7b597846f9b1ce36','','4-1000',0,7000000,'T/122011/2'),(30,'ed0d72eae2366c75ec5530da1d73ea83','','1-2000',7000000,0,'T/122011/2'),(31,'ed0d72eae2366c75ec5530da1d73ea83','','4-1000',0,7000000,'T/122011/2'),(32,'c53518195cbc98965c26db0b6b80d8f2','','6-1800',1850000,0,'T/122011/2'),(33,'c53518195cbc98965c26db0b6b80d8f2','1','1-1000',0,1850000,'T/122011/2'),(34,'958c36a3fd8342bb4dc69cbee059bb5d','','2-1100',6000000,0,'T/122011/2'),(35,'958c36a3fd8342bb4dc69cbee059bb5d','1','1-1000',0,6000000,'T/122011/2'),(36,'5ca0d0c80c651e363007dc63701e9366','','6-1100',6250000,0,'T/122011/2'),(37,'5ca0d0c80c651e363007dc63701e9366','1','1-1000',0,6250000,'T/122011/2'),(38,'9118e3ef7a398be439b9c12b76523ec5','','1-4100',30000000,0,'T/012012/0'),(39,'9118e3ef7a398be439b9c12b76523ec5','2','1-1000',0,30000000,'T/012012/0'),(40,'433d96bb2d326ea7cf04d678c6b83498','3','1-1000',100000000,0,'T/012012/0'),(41,'433d96bb2d326ea7cf04d678c6b83498','','2-3200',0,100000000,'T/012012/0');
/*!40000 ALTER TABLE `temp_trans_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-01-04 22:51:23
