-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 06, 2024 at 06:44 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `memo-vijee-in`
--

-- --------------------------------------------------------

--
-- Table structure for table `memo-excels`
--

DROP TABLE IF EXISTS `memo-excels`;
CREATE TABLE IF NOT EXISTS `memo-excels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` text NOT NULL,
  `name` text NOT NULL,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `memo-excels`
--

INSERT INTO `memo-excels` (`id`, `guid`, `name`, `data`) VALUES
(1, 'sfsdfsdf45654dsfr', 'Home loan repayment', '{\"justify\":{\"1\":\"left\",\"2\":\"right\",\"3\":\"right\",\"4\":\"right\",\"5\":\"right\",\"6\":\"right\",\"7\":\"right\",\"8\":\"right\",\"9\":\"right\",\"10\":\"right\"},\"data\":{\"1:1\":\"Date\",\"2:1\":\"Home loan\",\"3:1\":\"Home loan topup\",\"4:1\":\"Insurance\",\"5:1\":\"Total\",\"6:1\":\"Decreasing\",\"7:1\":\"Total decreased\",\"8:1\":\"Paid\",\"9:1\":\"Total paid\",\"10:1\":\"Interest paid\",\"1:2\":\"DATE(2024-02-14)\",\"2:2\":\"CURRENCY(1848416)\",\"3:2\":\"CURRENCY(867667)\",\"4:2\":\"CURRENCY(18246)\",\"5:2\":\"CURRENCY(2734329)\",\"6:2\":\"CURRENCY(12102)\",\"7:2\":\"CURRENCY(161549)\",\"8:2\":\"CURRENCY(32500)\",\"9:2\":\"CURRENCY(296800)\",\"10:2\":\"CURRENCY(135251)\",\"1:3\":\"DATE(2024-01-10)\",\"2:3\":\"CURRENCY(1852491)\",\"3:3\":\"CURRENCY(870896)\",\"4:3\":\"CURRENCY(23044)\",\"5:3\":\"CURRENCY(2746431)\",\"6:3\":\"CURRENCY(56830)\",\"7:3\":\"CURRENCY(149447)\",\"8:3\":\"CURRENCY(52500)\",\"9:3\":\"CURRENCY(264300)\",\"10:3\":\"CURRENCY(114853)\",\"1:4\":\"DATE(2023-12-11)\",\"2:4\":\"CURRENCY(1873478)\",\"3:4\":\"CURRENCY(897019)\",\"4:4\":\"CURRENCY(32764)\",\"5:4\":\"CURRENCY(2803261)\",\"6:4\":\"CURRENCY(17234)\",\"7:4\":\"CURRENCY(92617)\",\"8:4\":\"CURRENCY(62500)\",\"9:4\":\"CURRENCY(211800)\",\"10:4\":\"CURRENCY(119183)\",\"1:5\":\"DATE(2023-11-10)\",\"2:5\":\"CURRENCY(1877822)\",\"3:5\":\"CURRENCY(900229)\",\"4:5\":\"CURRENCY(42444)\",\"5:5\":\"CURRENCY(2820495)\",\"6:5\":\"CURRENCY(21933)\",\"7:5\":\"CURRENCY(75383)\",\"8:5\":\"CURRENCY(43100)\",\"9:5\":\"CURRENCY(149300)\",\"10:5\":\"CURRENCY(73917)\",\"1:6\":\"DATE(2023-10-16)\",\"2:6\":\"CURRENCY(1881701)\",\"3:6\":\"CURRENCY(918265)\",\"4:6\":\"CURRENCY(42462)\",\"5:6\":\"CURRENCY(2842428)\",\"6:6\":\"CURRENCY(53450)\",\"7:6\":\"CURRENCY(53450)\",\"8:6\":\"CURRENCY(53450)\",\"9:6\":\"CURRENCY(106200)\",\"10:6\":\"CURRENCY(52750)\",\"1:7\":\"DATE(2023-09-15)\",\"2:7\":\"CURRENCY(1899201)\",\"3:7\":\"CURRENCY(953515)\",\"4:7\":\"CURRENCY(43162)\",\"5:7\":\"CURRENCY(2895878)\",\"6:7\":\"CURRENCY(0)\",\"7:7\":\"CURRENCY(0)\",\"8:7\":\"CURRENCY(52750)\",\"9:7\":\"CURRENCY(52750)\",\"10:7\":\"CURRENCY(0)\"}}');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
