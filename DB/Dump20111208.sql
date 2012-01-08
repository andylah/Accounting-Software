-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: Dec 08, 2011 at 03:53 PM
-- Server version: 5.0.51
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Database: `project`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `tbl_acc_type`
-- 

CREATE TABLE `tbl_acc_type` (
  `idtbl_acc_type` int(11) NOT NULL auto_increment,
  `type_no` varchar(3) default NULL,
  `acc_type` varchar(25) default NULL,
  PRIMARY KEY  (`idtbl_acc_type`),
  UNIQUE KEY `acc_type_no_UNIQUE` (`type_no`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

-- 
-- Dumping data for table `tbl_acc_type`
-- 

INSERT INTO `tbl_acc_type` VALUES (1, '1-2', 'Account Payable');
INSERT INTO `tbl_acc_type` VALUES (2, '1-1', 'BANK');
INSERT INTO `tbl_acc_type` VALUES (3, '1-3', 'Account Receivable');
INSERT INTO `tbl_acc_type` VALUES (4, '1-4', 'Assets');
INSERT INTO `tbl_acc_type` VALUES (7, '1-6', 'Fixed Assets');
INSERT INTO `tbl_acc_type` VALUES (17, '2-3', 'Hutang');
INSERT INTO `tbl_acc_type` VALUES (16, '2', 'Fixed Assets');
INSERT INTO `tbl_acc_type` VALUES (10, '2-4', 'Fixed Assets');
INSERT INTO `tbl_acc_type` VALUES (11, '2-5', 'Fixed Assets');
INSERT INTO `tbl_acc_type` VALUES (12, '2-6', 'Fixed Assets');

-- --------------------------------------------------------

-- 
-- Table structure for table `tbl_user`
-- 

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- 
-- Dumping data for table `tbl_user`
-- 

INSERT INTO `tbl_user` VALUES (1, 'Andy', 'Suwito', 'andylah', 'e59e23c26a516d1b9dd7c90671c0a26a', '2011-11-26 00:00:00', '2011-12-06 00:00:00');
INSERT INTO `tbl_user` VALUES (2, 'Andy', 'Suwito', 'andylah1982', '040b7cf4a55014e185813e0644502ea9', '2011-11-27 00:00:00', '0000-00-00 00:00:00');
