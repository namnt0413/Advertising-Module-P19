-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2023 at 05:03 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

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
(35, 75, 2, '2023-01-09 17:11:17', '2023-01-10 16:54:46'),
(36, 76, 3, '2023-01-09 10:57:56', '2023-01-10 16:54:58'),
(54, 97, 3, '2023-01-09 17:49:35', '2023-01-11 18:33:23'),
(61, 98, 4, '2023-01-10 17:31:50', '2023-01-11 18:30:15'),
(65, 99, 1, '2023-01-10 17:39:20', '2023-01-10 17:39:20'),
(66, 99, 3, '2023-01-10 17:39:20', '2023-01-10 17:39:20'),
(67, 100, 3, '2023-01-11 18:58:41', '2023-01-11 18:58:41'),
(68, 100, 5, '2023-01-11 18:58:41', '2023-01-11 18:58:41');

-- --------------------------------------------------------

--
-- Table structure for table `ads_vouchers`
--

CREATE TABLE `ads_vouchers` (
  `id` int(11) NOT NULL,
  `ads_id` int(11) NOT NULL,
  `voucher_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ads_vouchers`
--

INSERT INTO `ads_vouchers` (`id`, `ads_id`, `voucher_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, '2023-02-24 17:03:11', '2023-02-24 17:03:11'),
(2, 1, 4, '2023-02-24 17:03:11', '2023-02-24 17:03:11');

-- --------------------------------------------------------

--
-- Table structure for table `advertisements`
--

CREATE TABLE `advertisements` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `visitTime` int(11) DEFAULT 0,
  `image` text DEFAULT NULL,
  `startedAt` datetime DEFAULT NULL,
  `finishedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `advertisements`
--

INSERT INTO `advertisements` (`id`, `name`, `content`, `visitTime`, `image`, `startedAt`, `finishedAt`, `createdAt`, `updatedAt`, `type`, `status`) VALUES
(75, 'Test ads 2', 'Chuong trinh khuyen mai ngay 12/12', 0, '\\uploads\\5152550ca958939a269d6f10b186e300', '2022-12-12 07:30:00', '2023-01-08 18:30:00', '2023-01-09 17:11:14', '2023-01-10 16:54:46', '1', 1),
(76, 'Test ads 4', 'test ads 7 content', 0, '\\uploads\\68beac543df1c2af2e3def658d5cbe1a', '2023-01-03 17:57:00', '2023-01-08 17:57:00', '2023-01-09 10:57:52', '2023-01-10 16:54:58', '2', 1),
(97, 'Test edit ads image', 'aaaaaaaa', 0, '\\uploads\\5cafab6d8dfa5152e5fd64ff22731b29', '2023-01-10 00:49:00', '2023-02-14 00:56:00', '2023-01-09 17:49:34', '2023-01-11 18:33:23', '1', 0),
(98, 'Test product 4', 'Chuong trinh khuyen mai ngay 12/12', 0, '\\uploads\\e74e5190a74bcbcb65a6f4bf27bd00cf', '2023-01-11 00:31:00', '2023-01-21 00:31:00', '2023-01-10 17:31:45', '2023-01-11 18:30:15', '3', 0),
(99, 'aaaa', 'aaaaaaaaa', 0, '\\uploads\\e6d5d5f44eec44140ba1941af7080941', '2022-11-01 00:39:00', '2022-12-09 00:39:00', '2023-01-10 17:39:16', '2023-01-10 17:39:16', '4', 1),
(100, 'Khuyen mai ban quan ao Shoppe', 'Chuong trinh khuyen mai ngay 6/1', 0, '\\uploads\\4ec63810c71cedcc29458ddaf0538094', '2023-01-06 18:00:00', '2023-01-13 07:00:00', '2023-01-11 18:58:37', '2023-01-11 18:58:37', '4', 0);

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
-- Indexes for table `ads_vouchers`
--
ALTER TABLE `ads_vouchers`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `ads_vouchers`
--
ALTER TABLE `ads_vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
