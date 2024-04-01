-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 06, 2024 at 06:45 AM
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
-- Table structure for table `memo-projects`
--

DROP TABLE IF EXISTS `memo-projects`;
CREATE TABLE IF NOT EXISTS `memo-projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` text NOT NULL,
  `name` text NOT NULL,
  `website` text NOT NULL,
  `iswebsiteactive` tinyint(1) NOT NULL,
  `comment` text NOT NULL,
  `company` text NOT NULL,
  `duration` text NOT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `memo-projects`
--

INSERT INTO `memo-projects` (`id`, `guid`, `name`, `website`, `iswebsiteactive`, `comment`, `company`, `duration`, `description`) VALUES
(1, 'ld46zz3jrryj41dpgdm', 'Castle Solutions', 'http://castlesolution.com', 0, 'Website completely not available', 'Castle Solutions', '3 months', ''),
(2, 'ld46zz3jol9tluoqvn', 'Educates', 'http://educates.co.in', 0, 'Website completely not available', 'Castle Solutions', '2 months', ''),
(3, 'ld46zz3jmgalhxnkorr', 'Sree Pariyanampatta Devaswom', 'http://sreepariyanampattadevaswom.com', 0, 'Website updated by other developer', 'Castle Solutions', '2 months', ''),
(4, 'ld46zz3jipd6f3dx2u', 'Blue Horizon Infotech', 'http://bluehorizoninfotech.com', 1, 'Website updated by other developer', 'Blue Horizon Infotech', '4 months', ''),
(5, 'ld46zz3j08deuxzuwmn5', 'CMI Infotech', 'http://cmiinfotech.com', 1, 'Website available', 'Blue Horizon Infotech', '1 month', ''),
(6, 'ld46zz3jmir6j5pw7io', 'Allan Ellis', 'http://allanellis.com', 0, 'Website completely not available', 'Blue Horizon Infotech', '1 month', ''),
(7, 'ld46zz3jqssfa8tox6g', 'Sweet Tech', 'http://sweettech.com', 0, 'Website completely not available', 'Blue Horizon Infotech', '1 month', ''),
(8, 'ld46zz3j23j3f1e20ge', 'Bright and Tight Bar Crawl', 'http://brightandtightbarcrawl.com', 0, 'Website completely not available', 'Blue Horizon Infotech', '1 month', ''),
(9, 'ld46zz3kwd6s98fm7jc', 'Zoltan Pool', 'http://zoltanpool.com', 0, 'Website completely not available', 'Blue Horizon Infotech', '1 month', ''),
(10, 'ld46zz3kxjjkwmbtkaa', 'Europe Study Centre', 'http://europestudycentre.com', 1, 'Website updated by other developer', 'Steps On Web', '3 months', ''),
(11, 'ld46zz3knqqpxcjz7tl', 'E-visa', 'http://e-visa.com.au', 1, 'Website available', 'Steps On Web', '2 months', ''),
(12, 'ld46zz3kbszf87jkldb', 'Imarg', 'http://imarg.com', 0, 'Website completely not available', 'Steps On Web', '1 month', ''),
(13, 'ld46zz3k32arm3pa256', 'Nage India', 'http://nageindia.com', 0, 'Website completely not available', 'Steps On Web', '1 month', ''),
(14, 'ld46zz3k5myrrm3fh9h', 'Evershine Placements', 'http://evershineplacements.com', 0, 'Website completely not available', 'Steps On Web', '1 month', ''),
(15, 'ld46zz3k790mjpurei', 'Hotel Pookodans', 'http://hotelpookodans.com', 0, 'Website updated by other developer', 'Steps On Web', '2 months', ''),
(16, 'ld46zz3ku3bla7qe1o', 'Nest Wedding', 'http://stepsonweb.com/nest', 0, 'Website completely not available', 'Steps On Web', '1 month', ''),
(17, 'ltfbd9xhq51x5hobd4r', 'Ice Cube Events', 'http://icecubeevents.co.in', 0, 'Website completely not available', 'Steps On Web', '1 month', ''),
(18, 'ltfbd9xh1o3o6z72n9o', 'Nest Wedding', 'http://themars.co.in/test', 0, 'Website completely not available', 'Steps On Web', '1 month', ''),
(19, 'ltfbd9xhw3uj04ckw2g', 'Nest Wedding', 'http://pollson.net', 0, 'Website completely not available', 'Steps On Web', '1 month', ''),
(20, 'ltfbd9xh7pvj5d0p9zx', 'Nest Wedding', 'http://prodigy.net.in', 0, 'Website updated by other developer', 'Steps On Web', '1 month', ''),
(21, 'ltfbd9xifvulez2meir', 'Reachout Suite', 'http://reachoutsuite.com', 0, 'Website updated by other developer', 'Fingent Global Solutions', '1 month', ''),
(22, 'ltfbd9xi52ecakdfn5k', 'XenopsJS', 'http://xenopsjs.com', 1, 'Website available', 'Fingent Global Solutions', '1 month', ''),
(23, 'ltfbd9xinv2p4r7i1qi', 'Ibox Dashboards', 'http://iboxdashboards.co.uk', 0, 'Website updated by other developer', 'Fingent Global Solutions', '1 month', ''),
(24, 'ltfbd9xivcioniu8uq', 'RMA Luxury Auctions', 'http://rmaluxuryauctions.com', 0, 'Website completely not available', 'Fingent Global Solutions', '1 month', ''),
(25, 'ltfbd9xi14pdsru20ts', 'W Click', 'http://w-click.com', 0, 'Website completely not available', 'Fingent Global Solutions', '1 month', ''),
(26, 'ltfbd9xjadtuk74e1z', 'Aware Mobility', 'http://awaremobility.com', 1, 'Website available', 'Fingent Global Solutions', '1 month', ''),
(27, 'ltfbd9xjc63xm51df8f', 'Softentec', 'https://softentec.com', 0, 'Website updated by other developer', 'Freelance', '12 months', ''),
(28, 'ltfbd9xjzz00bb16489', 'Aster Interiors', 'https://asterinteriors.com', 0, 'Website updated by other developer', 'Freelance', '1 month', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
