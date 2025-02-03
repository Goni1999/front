-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2025 at 06:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `enquiries`
--

CREATE TABLE `enquiries` (
  `id` int(11) NOT NULL,
  `enquiryType` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `country` varchar(100) NOT NULL,
  `scamWebsite` varchar(255) DEFAULT NULL,
  `lostMoney` varchar(50) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enquiries`
--

INSERT INTO `enquiries` (`id`, `enquiryType`, `fullName`, `email`, `phone`, `country`, `scamWebsite`, `lostMoney`, `message`, `created_at`) VALUES
(1, 'fraud-scams', 'user', 'User2@example.com', '+12 34 56 78 90', 'Argentina', 'https://scam.com', '4500', 'i lost money', '2025-01-11 01:47:36'),
(2, 'fraud-scams', 'user', 'user@user.com', '+12 34 56 78 90', 'Nepal', 'https://scam.com', '4600', 'horrible', '2025-02-02 10:48:10');

-- --------------------------------------------------------

--
-- Table structure for table `investments`
--

CREATE TABLE `investments` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_country_code` varchar(10) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `investment_amount` decimal(10,2) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `investments`
--

INSERT INTO `investments` (`id`, `first_name`, `last_name`, `phone_country_code`, `phone_number`, `email`, `investment_amount`, `details`, `created_at`) VALUES
(1, 'user', 'user', '+1', '45 55 55 55', 'User2@example.com', 3000.00, 'yes', '2025-01-11 00:27:12'),
(2, 'user', 'user', '+1', '232323', 'user@example.com', 3211.00, 'no', '2025-02-02 10:37:29'),
(3, 'user', 'him', '+34', '23 23 23 23 ', 'user@user.com', 4000.00, 'no', '2025-02-02 10:39:05');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `name`, `surname`, `email`, `description`, `created_at`) VALUES
(1, 'User', 'User', 'User2@example.com', 'my case is very good i lost 1000 dollars please help', '2025-01-11 01:30:33'),
(2, 'User', 'nope', 'user@user.com', 'user', '2025-02-02 10:48:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'user',
  `BTC` float DEFAULT 0,
  `ETH` float DEFAULT 0,
  `ADA` float DEFAULT 0,
  `XRP` float DEFAULT 0,
  `DOGE` float DEFAULT 0,
  `BNB` float DEFAULT 0,
  `SOL` float DEFAULT 0,
  `DOT` float DEFAULT 0,
  `total` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `BTC`, `ETH`, `ADA`, `XRP`, `DOGE`, `BNB`, `SOL`, `DOT`, `total`) VALUES
(1, 'User2', 'User2@example.com', '$2b$10$N5lc.P5S0p2D.9P5ilE1zedm8XmfnCOImiSRZLzyt4ch9WSkHXE/e', 'user', 0, 0.292724, 112135, 0, 0, 0, 0, 0, 100043.21),
(2, 'Admin', 'Admin@email.com', '$2b$10$/WnYvAC1IdJ/47FE81tgSumFHyUmBIOWYYXik6tEEYanlbcB/D/FW', 'admin', 5, 0, 0, 0, 0, 0, 0, 0, 0),
(3, 'User3', 'User3@example.com', '$2b$10$eLvJ4Hao7b09V.sJH6ZWleUvFQKFTmqcvBKjZR8idkrTQ4s7Y8DOK', 'user', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(8, 'User', 'User4@email.com', '$2b$10$ecLk0y2Z1lH7Mo3TuuEYie5vQA.n1DseoWeQBWw7IgyH4Mw2lVzYq', 'user', 0, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 'User', 'user@user.com', '$2b$10$pG4y6cIkeZ6I7oP0Y6I2Vecf6WGQx7/u3RL.yhFhLh0LFIFmukM1i', 'user', 0, 0, 0, 0, 0, 0, 0, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `enquiries`
--
ALTER TABLE `enquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investments`
--
ALTER TABLE `investments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `enquiries`
--
ALTER TABLE `enquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `investments`
--
ALTER TABLE `investments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
