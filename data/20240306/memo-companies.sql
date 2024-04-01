-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 06, 2024 at 06:43 AM
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
-- Table structure for table `memo-companies`
--

DROP TABLE IF EXISTS `memo-companies`;
CREATE TABLE IF NOT EXISTS `memo-companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` text NOT NULL,
  `name` text NOT NULL,
  `datefrom` text NOT NULL,
  `dateto` text NOT NULL,
  `type` text NOT NULL,
  `role` text NOT NULL,
  `tag` text NOT NULL,
  `color` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `memo-companies`
--

INSERT INTO `memo-companies` (`id`, `guid`, `name`, `datefrom`, `dateto`, `type`, `role`, `tag`, `color`) VALUES
(1, 'lcoqyvoqy6x3gvwovk', 'Orchid Enterprises', '2009-05-03T18:30:00.000Z', '2009-11-29T18:30:00.000Z', 'FULL TIME', 'Graphic Designer', 'ORCHID', '#BB4491'),
(2, 'lcoqztfx3mmzvalalx3', 'Castle Solutions', '2009-11-30T18:30:00.000Z', '2011-05-16T18:30:00.000Z', 'FULL TIME', 'Web Designer', 'CASTLE', '#EC791F'),
(3, 'lcor09bkjksti4e8r2e', 'Blue Horizon Infotech', '2011-05-22T18:30:00.000Z', '2012-05-29T18:30:00.000Z', 'FULL TIME', 'Web Designer', 'BHI', '#38527C'),
(4, 'lcor0m70hxxsz0u089', 'Steps On Web', '2012-06-03T18:30:00.000Z', '2013-07-07T18:30:00.000Z', 'FULL TIME', 'Sr Web Designer', 'SOW', '#E01C30'),
(5, 'lcorx0cu1chpohbb5so', 'Fingent Global Solutions', '2013-07-10T18:30:00.000Z', '2020-09-03T18:30:00.000Z', 'FULL TIME', 'UI Designer, TL UI, Frontend Developer, TL Frontend', 'FINGENT', '#DF2228'),
(6, 'lcos0d5sa3r1jlj5nth', 'BEO', '2020-09-06T18:30:00.000Z', '2020-12-21T18:30:00.000Z', 'FULL TIME', 'Technical Lead - Frontend', 'BEO', '#464646'),
(7, 'lcos2uol6hada1lalni', 'Aspire Systems (RapidValue)', '2020-12-27T18:30:00.000Z', '2022-03-28T18:30:00.000Z', 'FULL TIME', 'Senior Frontend Developer', 'ASPIRE', '#8b48AE'),
(8, 'lcoswjqb2knoh41nsyk', 'Atos India Private Limited (Altezzasys)', '2022-03-21T18:30:00.000Z', '2023-02-09T18:30:00.000Z', 'FREELANCE', 'Frontend Developer', 'ATOS', '#02639F'),
(9, 'lcot56o7oina0fe3zxk', 'Elixr Labs Technologies Pvt Ltd', '2022-04-03T18:30:00.000Z', '', 'FULL TIME', 'ReactJS Architect', 'ELIXR', '#E4865A'),
(10, 'lcot7kex85map2ipva4', 'Java R&D Pvt. Ltd.', '2021-11-29T18:30:00.000Z', '2022-02-14T18:30:00.000Z', 'PART TIME', 'Training, Coding & Development Support', 'JAVARND', '#69AFE0'),
(11, 'lcot8zb7mveg13f569o', 'Altimetric', '2021-10-22T18:30:00.000Z', '2022-02-16T18:30:00.000Z', 'PART TIME', 'ReactJS Interviewer', 'ALTIMETRIC', '#d24e16');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
