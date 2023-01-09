-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2023 at 12:23 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sp19_ads`
--

-- --------------------------------------------------------

--
-- Table structure for table `ads_products`
--

CREATE TABLE `ads_products` (
  `id` int(11) NOT NULL,
  `ads_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ads_products`
--

INSERT INTO `ads_products` (`id`, `ads_id`, `product_id`, `createdAt`, `updatedAt`) VALUES
(35, 75, 4, '2023-01-09 17:11:17', '2023-01-09 11:11:25'),
(36, 76, 3, '2023-01-09 10:57:56', '2023-01-09 10:57:56'),
(44, 77, 1, '2023-01-09 11:18:57', '2023-01-09 11:18:57'),
(45, 77, 3, '2023-01-09 11:18:57', '2023-01-09 11:18:57'),
(46, 77, 5, '2023-01-09 11:18:57', '2023-01-09 11:18:57');

-- --------------------------------------------------------

--
-- Table structure for table `advertisements`
--

CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `visitTime` int(11) DEFAULT 0,
  `image` longblob DEFAULT NULL,
  `startedAt` datetime DEFAULT NULL,
  `finishedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `advertisements`
--

INSERT INTO `advertisements` (`id`, `name`, `content`, `visitTime`, `image`, `startedAt`, `finishedAt`, `createdAt`, `updatedAt`, `type`, `product_id`) VALUES
(75, 'Test ads 2', 'Chuong trinh khuyen mai ngay 12/12', 0, NULL, '2022-12-12 07:30:00', '2023-01-08 18:30:00', '2023-01-09 17:11:14', '2023-01-09 11:11:25', '1', NULL),
(76, 'Test ads 4', 'test ads 7 content', 0, NULL, '2023-01-03 17:57:00', '2023-01-08 17:57:00', '2023-01-09 10:57:52', '2023-01-09 10:57:52', '2', NULL),
(77, 'Test ads 7', 'test ads 7 content', 0, NULL, '2023-01-01 00:00:00', '2023-01-14 19:00:00', '2023-01-09 11:02:01', '2023-01-09 11:18:57', '4', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20221126171736-create-advertisement.js'),
('20221130094843-add-column-type-and-productid-inads.js'),
('20221130163553-create-ads-product.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ads_products`
--
ALTER TABLE `ads_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ads_products`
--
ALTER TABLE `ads_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
