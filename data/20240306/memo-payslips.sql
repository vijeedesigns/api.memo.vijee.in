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
-- Table structure for table `memo-payslips`
--

DROP TABLE IF EXISTS `memo-payslips`;
CREATE TABLE IF NOT EXISTS `memo-payslips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` text NOT NULL,
  `url` text NOT NULL,
  `company` text NOT NULL,
  `date` date NOT NULL,
  `ctc` decimal(16,2) NOT NULL,
  `net` decimal(16,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `memo-payslips`
--

INSERT INTO `memo-payslips` (`id`, `guid`, `url`, `company`, `date`, `ctc`, `net`) VALUES
(1, 'lik4i792u53q2zl32xo', '201507-Jul-Fingent.pdf', 'Fingent', '2015-07-01', '34749.00', '32998.00'),
(2, 'lik4i7922v6a9swcrip', '201410-Oct-Fingent.pdf', 'Fingent', '2014-10-01', '30405.00', '28680.00'),
(3, 'lik4i792zq90h2b4hr', '201512-Dec-Fingent.pdf', 'Fingent', '2015-12-01', '43436.00', '41685.00'),
(4, 'lik4i792gmi7s0ah3n7', '201312-Dec-Fingent.pdf', 'Fingent', '2013-12-01', '24220.00', '23170.00'),
(5, 'lik4i7924clqwekkzw5', '201809-Sep-Fingent.pdf', 'Fingent', '2018-09-01', '49048.00', '46262.00'),
(6, 'lik4i7928woryyjm9p4', '201903-Mar-Fingent.pdf', 'Fingent', '2019-03-01', '56580.00', '54760.00'),
(7, 'lik4i792it992tx0ef', '202010-Oct-BEO.pdf', 'BEO', '2020-10-01', '100000.00', '97972.00'),
(8, 'lik4i792lon17p0ile', '202110-Oct-Aspire.pdf', 'Aspire Systems', '2021-10-01', '106533.00', '90126.00'),
(9, 'lik4i792116sqjrg02df', '202210-Oct-Elixr-Labs.pdf', 'Elixr Labs', '2022-10-01', '159847.00', '126509.00'),
(10, 'lik4i792rzsukgztia', '201612-Dec-Fingent.pdf', 'Fingent', '2016-12-01', '40656.00', '38292.00'),
(11, 'lik4i792imu9pyxbr6d', '201908-Aug-Fingent.pdf', 'Fingent', '2019-08-01', '56580.00', '50010.00'),
(12, 'lik4i792dseqvkwf61c', '202007-Jul-Fingent.pdf', 'Fingent', '2020-07-01', '65067.00', '58147.00'),
(13, 'lik4i792joxbwrumw5k', '202109-Sep-Aspire.pdf', 'Aspire Systems', '2021-09-01', '110533.00', '92865.00'),
(14, 'lik4i7926v9thk2elsw', '202305-May-Elixr-Labs.pdf', 'Elixr Labs', '2023-05-01', '176631.00', '146328.00'),
(15, 'lik4i792m931yh0oly', '201701-Jan-Fingent.pdf', 'Fingent', '2017-01-01', '40656.00', '38292.00'),
(16, 'lik4i792fo5d2730hyi', '201708-Aug-Fingent.pdf', 'Fingent', '2017-08-01', '43706.00', '41413.00'),
(17, 'lik4i792ad4uz6pf9kd', '201812-Dec-Fingent.pdf', 'Fingent', '2018-12-01', '56580.00', '53560.00'),
(18, 'lik4i792xxig3n3dnu', '202001-Jan-Fingent.pdf', 'Fingent', '2020-01-01', '65067.00', '58247.00'),
(19, 'lik4i792ohkf434br2', '202105-May-Aspire.pdf', 'Aspire Systems', '2021-05-01', '110733.00', '92402.00'),
(20, 'lik4i792q30uyhfcihk', '201409-Sep-Fingent.pdf', 'Fingent', '2014-09-01', '30720.00', '29940.00'),
(21, 'lik4i792fvl350iodj9', '201412-Dec-Fingent.pdf', 'Fingent', '2014-12-01', '38006.00', '36911.00'),
(22, 'lik4i79250srafvxit4', '201503-Mar-Fingent.pdf', 'Fingent', '2015-03-01', '30405.00', '29230.00'),
(23, 'lik4i79282h9jg7vq6x', '201706-Jun-Fingent.pdf', 'Fingent', '2017-06-01', '43706.00', '43433.00'),
(24, 'lik4i792esw8mo0kqd', '201712-Dec-Fingent Part 01.pdf', 'Fingent', '2017-12-01', '38067.00', '35777.00'),
(25, 'lik4i792gqkbnbe45jm', '202003-Mar-Fingent.pdf', 'Fingent', '2020-03-01', '65067.00', '62847.00'),
(26, 'lik4i792b33n7voabq8', '202203-Mar-Aspire.pdf', 'Aspire Systems', '2022-03-01', '122239.00', '109932.00'),
(27, 'lik4i792a6dlc51ljzh', '202302-Feb-Elixr-Labs.pdf', 'Elixr Labs', '2023-02-01', '159847.00', '125268.00'),
(28, 'lik4i792lagfmq735mh', '201308-Aug-Fingent.pdf', 'Fingent', '2013-08-01', '24220.00', '22340.00'),
(29, 'lik4i792wqwm13irh5b', '201403-Mar-Fingent.pdf', 'Fingent', '2014-03-01', '24220.00', '23281.00'),
(30, 'lik4i792zmwusokc7rl', '201307-Jul-Fingent.pdf', 'Fingent', '2013-07-01', '24446.00', '16569.00'),
(31, 'lik4i792z0tzwqnt0d8', '201811-Nov-Fingent.pdf', 'Fingent', '2018-11-01', '56580.00', '53560.00'),
(32, 'lik4i792e0whxkpyur', '201910-Oct-Fingent.pdf', 'Fingent', '2019-10-01', '65067.00', '58247.00'),
(33, 'lik4i79268rgu4nbhsc', '202202-Feb-Aspire.pdf', 'Aspire Systems', '2022-02-01', '110133.00', '94416.00'),
(34, 'lik4i792se7ulixbrc', '201803-Mar-Fingent.pdf', 'Fingent', '2018-03-01', '43706.00', '40863.00'),
(35, 'lik4i7924dzixjwkrs5', '201806-Jun-Fingent.pdf', 'Fingent', '2018-06-01', '49048.00', '47262.00'),
(36, 'lik4i792f9ve0rxa31d', '201907-Jul-Fingent.pdf', 'Fingent', '2019-07-01', '56580.00', '51260.00'),
(37, 'lik4i792i2xm7xie8ij', '202101-Jan-Aspire.pdf', 'Aspire Systems', '2021-01-01', '120278.00', '118041.00'),
(38, 'lik4i7920f0rxhcuvtca', '202112-Dec-Aspire.pdf', 'Aspire Systems', '2021-12-01', '110533.00', '93943.00'),
(39, 'lik4i792ux70offmdd', '202207-Jul-Elixr-Labs.pdf', 'Elixr Labs', '2022-07-01', '159847.00', '126559.00'),
(40, 'lik4i792dkip05hfoc', '201401-Jan-Fingent.pdf', 'Fingent', '2014-01-01', '24220.00', '23440.00'),
(41, 'lik4i792cxt5fcc5nd', '201608-Aug-Fingent.pdf', 'Fingent', '2016-08-01', '40656.00', '38292.00'),
(42, 'lik4i792g33nt6gwbo', '201707-Jul-Fingent.pdf', 'Fingent', '2017-07-01', '43706.00', '41393.00'),
(43, 'lik4i792cbhfb7oeejj', '201709-Sep-Fingent.pdf', 'Fingent', '2017-09-01', '43706.00', '40163.00'),
(44, 'lik4i792rqv0p53c5bl', '201805-May-Fingent.pdf', 'Fingent', '2018-05-01', '43706.00', '42113.00'),
(45, 'lik4i792octsdkapgs8', '201807-Jul-Fingent.pdf', 'Fingent', '2018-07-01', '49048.00', '47262.00'),
(46, 'lik4i792104vtklxvgd', '201911-Nov-Fingent.pdf', 'Fingent', '2019-11-01', '65067.00', '58247.00'),
(47, 'lik4i7924bx0lqvk2sc', '201912-Dec-Fingent.pdf', 'Fingent', '2019-12-01', '75067.00', '68217.00'),
(48, 'lik4i792oevak7y5jx', '202009-Sep-BEO.pdf', 'BEO', '2020-09-01', '80000.00', '78332.00'),
(49, 'lik4i792sdfhevibvfp', '202102-Feb-Aspire.pdf', 'Aspire Systems', '2021-02-01', '106532.00', '104295.00'),
(50, 'lik4i792gb48nmq0vlq', '202209-Sep-Elixr-Labs.pdf', 'Elixr Labs', '2022-09-01', '159847.00', '126509.00'),
(51, 'lik4i792o16bortvd2c', '201506-Jun-Fingent.pdf', 'Fingent', '2015-06-01', '34749.00', '32998.00'),
(52, 'lik4i792ddvnnuqy1q6', '201509-Sep-Fingent.pdf', 'Fingent', '2015-09-01', '34749.00', '32999.00'),
(53, 'lik4i792rynjm2gu03f', '201607-Jul-Fingent.pdf', 'Fingent', '2016-07-01', '40656.00', '38292.00'),
(54, 'lik4i792o9hrxcyb9y', '201710-Oct-Fingent.pdf', 'Fingent', '2017-10-01', '43706.00', '41213.00'),
(55, 'lik4i792o08yu0hcq9b', '202106-Jun-Aspire.pdf', 'Aspire Systems', '2021-06-01', '110733.00', '92539.00'),
(56, 'lik4i792ovo9ic9k7k', '202108-Aug-Aspire.pdf', 'Aspire Systems', '2021-08-01', '109533.00', '91991.00'),
(57, 'lik4i7929lg70n9luvj', '202111-Nov-Aspire.pdf', 'Aspire Systems', '2021-11-01', '114933.00', '96442.00'),
(58, 'lik4i792gbgehcbgrvo', '201404-Apr-Fingent.pdf', 'Fingent', '2014-04-01', '24220.00', '23440.00'),
(59, 'lik4i792crl255l6vsv', '201405-May-Fingent.pdf', 'Fingent', '2014-05-01', '24220.00', '23360.00'),
(60, 'lik4i792pg80edanwy9', '201505-May-Fingent.pdf', 'Fingent', '2015-05-01', '34749.00', '32998.00'),
(61, 'lik4i792cenuq5eeei8', '201601-Jan-Fingent.pdf', 'Fingent', '2016-01-01', '34749.00', '32998.00'),
(62, 'lik4i792xd242agbzle', '201603-Mar-Fingent.pdf', 'Fingent', '2016-03-01', '34749.00', '32248.00'),
(63, 'lik4i7929g7tjvzn38', '201610-Oct-Fingent.pdf', 'Fingent', '2016-10-01', '40656.00', '38292.00'),
(64, 'lik4i792v9pyo9hwc9', '201902-Feb-Fingent.pdf', 'Fingent', '2019-02-01', '56580.00', '53510.00'),
(65, 'lik4i792gl4urcurfiv', '202212-Dec-Elixr-Labs.pdf', 'Elixr Labs', '2022-12-01', '159847.00', '126508.00'),
(66, 'lik4i792sjrercribbo', '202301-Jan-Elixr-Labs.pdf', 'Elixr Labs', '2023-01-01', '159847.00', '135926.00'),
(67, 'lik4i792utg4s44rl1', '202303-Mar-Elixr-Labs.pdf', 'Elixr Labs', '2023-03-01', '159847.00', '125270.00'),
(68, 'lik4i792b1y06ert8y7', '201501-Jan-Fingent.pdf', 'Fingent', '2015-01-01', '30405.00', '29310.00'),
(69, 'lik4i79274kqvw3ytrn', '201310-Oct-Fingent.pdf', 'Fingent', '2013-10-01', '24220.00', '23440.00'),
(70, 'lik4i792w5cu9cz2e4a', '201508-Aug-Fingent.pdf', 'Fingent', '2015-08-01', '34749.00', '31798.00'),
(71, 'lik4i7925lo188jew9c', '201804-Apr-Fingent.pdf', 'Fingent', '2018-04-01', '43706.00', '42113.00'),
(72, 'lik4i7929k3sutf16ta', '201906-Jun-Fingent.pdf', 'Fingent', '2019-06-01', '56580.00', '51260.00'),
(73, 'lik4i7928jwkha0jjwx', '202005-May-Fingent.pdf', 'Fingent', '2020-05-01', '65067.00', '58147.00'),
(74, 'lik4i7922btom5y18ob', '202006-Jun-Fingent.pdf', 'Fingent', '2020-06-01', '65067.00', '58147.00'),
(75, 'lik4i792o1m69wbeiyf', '202104-Apr-Aspire.pdf', 'Aspire Systems', '2021-04-01', '110133.00', '92950.00'),
(76, 'lik4i792gys4hrc4cx', '202107-Jul-Aspire.pdf', 'Aspire Systems', '2021-07-01', '115733.00', '93692.00'),
(77, 'lik4i792zj5m31y4m3f', '202211-Nov-Elixr-Labs.pdf', 'Elixr Labs', '2022-11-01', '159847.00', '126509.00'),
(78, 'lik4i792hbo5x8ttq97', '201402-Feb-Fingent.pdf', 'Fingent', '2014-02-01', '24220.00', '22190.00'),
(79, 'lik4i792inh5x1df7a', '201511-Nov-Fingent.pdf', 'Fingent', '2015-11-01', '34749.00', '32998.00'),
(80, 'lik4i79263pphrjll8b', '201606-Jun-Fingent.pdf', 'Fingent', '2016-06-01', '40656.00', '38292.00'),
(81, 'lik4i792e7kxmil1dpr', '201905-May-Fingent.pdf', 'Fingent', '2019-05-01', '56580.00', '51260.00'),
(82, 'lik4i792pwe2ns7m5ui', '202008-Aug-Fingent.pdf', 'Fingent', '2020-08-01', '65067.00', '56597.00'),
(83, 'lik4i792i1dd0w52d1b', '202205-May-Elixr-Labs.pdf', 'Elixr Labs', '2022-05-01', '159847.00', '126559.00'),
(84, 'lik4i792v8gipp9u8z8', '202304-Apr-Elixr-Labs.pdf', 'Elixr Labs', '2023-04-01', '193415.00', '163112.00'),
(85, 'lik4i792aipgy5g9pki', '201411-Nov-Fingent.pdf', 'Fingent', '2014-11-01', '30405.00', '29310.00'),
(86, 'lik4i792kp1xrkb3qpb', '201407-Jul-Fingent.pdf', 'Fingent', '2014-07-01', '29258.00', '28478.00'),
(87, 'lik4i792kfjld1gs3xe', '201309-Sep-Fingent.pdf', 'Fingent', '2013-09-01', '24220.00', '23440.00'),
(88, 'lik4i792i3zjnpvqhrp', '201602-Feb-Fingent.pdf', 'Fingent', '2016-02-01', '34749.00', '29498.00'),
(89, 'lik4i7924yp0y5nhmpi', '201609-Sep-Fingent.pdf', 'Fingent', '2016-09-01', '40656.00', '37042.00'),
(90, 'lik4i792o2y7057qm1', '201611-Nov-Fingent.pdf', 'Fingent', '2016-11-01', '40656.00', '38292.00'),
(91, 'lik4i792jy8ctrbr3x', '201702-Feb-Fingent.pdf', 'Fingent', '2017-02-01', '40656.00', '36742.00'),
(92, 'lik4i792cydswtviu6o', '201808-Aug-Fingent.pdf', 'Fingent', '2018-08-01', '49048.00', '45012.00'),
(93, 'lik4i792sa3y8a7e3s', '202002-Feb-Fingent.pdf', 'Fingent', '2020-02-01', '65067.00', '61597.00'),
(94, 'lik4i792lb9ttn88kk8', '202208-Aug-Elixr-Labs.pdf', 'Elixr Labs', '2022-08-01', '159847.00', '126559.00'),
(95, 'lik4i792ap07rf1xgq', '201311-Nov-Fingent.pdf', 'Fingent', '2013-11-01', '24220.00', '23170.00'),
(96, 'lik4i7926ta6mhv16ai', '201504-Apr-Fingent.pdf', 'Fingent', '2015-04-01', '34749.00', '33498.00'),
(97, 'lik4i792t98ndrrdqfk', '201705-May-Fingent.pdf', 'Fingent', '2017-05-01', '40656.00', '38492.00'),
(98, 'lik4i792x3a2mxpo6kp', '201801-Jan-Fingent.pdf', 'Fingent', '2018-01-01', '43706.00', '41213.00'),
(99, 'lik4i7929fhftxyegxl', '202004-Apr-Fingent.pdf', 'Fingent', '2020-04-01', '65067.00', '57847.00'),
(100, 'lik4i792c5vnh1pwibb', '202201-Jan-Aspire.pdf', 'Aspire Systems', '2022-01-01', '109733.00', '93547.00'),
(101, 'lik4i792wf29a4oaj2o', '201408-Aug-Fingent.pdf', 'Fingent', '2014-08-01', '29258.00', '28478.00'),
(102, 'lik4i7925ie0o18wq2c', '201605-May-Fingent.pdf', 'Fingent', '2016-05-01', '40656.00', '38392.00'),
(103, 'lik4i792ms6gy6oxz5', '201711-Nov-Fingent.pdf', 'Fingent', '2017-11-01', '43706.00', '41213.00'),
(104, 'lik4i792ean5s28sz8b', '201909-Sep-Fingent.pdf', 'Fingent', '2019-09-01', '65067.00', '59747.00'),
(105, 'lik4i7925pvf86iljft', '202206-Jun-Elixr-Labs.pdf', 'Elixr Labs', '2022-06-01', '159847.00', '120039.00'),
(106, 'lik4i792dymyzr7pafa', '201502-Feb-Fingent.pdf', 'Fingent', '2015-02-01', '30405.00', '28060.00'),
(107, 'lik4i792o4btexyz53r', '201604-Apr-Fingent.pdf', 'Fingent', '2016-04-01', '40656.00', '39192.00'),
(108, 'lik4i792iz9lpnk72vl', '202103-Mar-Aspire.pdf', 'Aspire Systems', '2021-03-01', '114532.00', '112296.00'),
(109, 'lik4i792ppbj332cv', '201406-Jun-Fingent.pdf', 'Fingent', '2014-06-01', '29258.00', '28398.00'),
(110, 'lik4i792urwt53jgk2n', '201510-Oct-Fingent.pdf', 'Fingent', '2015-10-01', '34749.00', '32999.00'),
(111, 'lik4i792mra5wo3mmzq', '201703-Mar-Fingent.pdf', 'Fingent', '2017-03-01', '40656.00', '38254.00'),
(112, 'lik4i792cmff554l0ed', '201704-Apr-Fingent.pdf', 'Fingent', '2017-04-01', '40656.00', '39192.00'),
(113, 'lik4i79220onzzzbj2m', '201712-Dec-Fingent Part 02.pdf', 'Fingent', '2017-12-01', '5639.00', '5436.00'),
(114, 'lik4i792tvngjrrjlbh', '201802-Feb-Fingent.pdf', 'Fingent', '2018-02-01', '43706.00', '42113.00'),
(115, 'lik4i792gnacfpquq18', '201810-Oct-Fingent.pdf', 'Fingent', '2018-10-01', '56580.00', '53560.00'),
(116, 'lik4i792gthmf0664uu', '201901-Jan-Fingent.pdf', 'Fingent', '2019-01-01', '56580.00', '53560.00'),
(117, 'lik4i792g6iriu48rd', '201904-Apr-Fingent.pdf', 'Fingent', '2019-04-01', '56580.00', '54760.00'),
(118, 'lik4i792txj3lkyyc5d', '202204-Apr-Elixr-Labs.pdf', 'Elixr Labs', '2022-04-01', '143863.00', '110575.00'),
(119, 'ljil88pmd805v4g6ffv', 'Payslip_EXR-37_Jun_2023.pdf', 'Elixr Labs', '2023-06-30', '176631.00', '146327.00'),
(120, 'lkqt3h6za69qunzbnfj', 'Payslip_EXR-37_Jul_2023.pdf', 'Elixr Labs', '2023-07-30', '176631.00', '146328.00'),
(121, 'lm0f5div33rp8m2n28u', 'Payslip_EXR-37_Aug_2023.pdf', 'Elixr Labs', '2023-08-31', '176631.00', '145910.00'),
(122, 'ln4ig4a82pii7ktle76', 'Payslip_EXR-37_Sep_2023.pdf', 'Elixr Labs', '2023-09-29', '271588.00', '141678.00'),
(123, 'loe8430ysayyx2wpny', 'Payslip_EXR-37_Oct_2023.pdf', 'Elixr Labs', '2023-10-30', '176631.00', '142095.00'),
(124, 'lpw96elb171asghz50v', 'Payslip_EXR-37_Nov_2023.pdf', 'Elixr Labs', '2023-11-30', '176631.00', '142096.00'),
(125, 'lr4hozg36ks21jr2upn', 'Payslip_EXR-37_Dec_2023.pdf', 'Elixr Labs', '2023-12-28', '176631.00', '142094.00'),
(126, 'ls4vhyabcc6t0v545vh', 'Payslip_EXR-37_Jan_2024.pdf', 'Elixr Labs', '2024-01-31', '176631.00', '142096.00'),
(128, 'ltcwlit0o9pev06jao', 'Payslip_EXR-37_Feb_2024.pdf', 'Elixr Labs', '2024-02-29', '176631.00', '142094.00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
