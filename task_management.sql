-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2024 at 01:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `childtasks`
--

CREATE TABLE `childtasks` (
  `id` int(11) NOT NULL,
  `parentTaskId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `childtasks`
--

INSERT INTO `childtasks` (`id`, `parentTaskId`, `title`, `description`, `level`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Dummy child task', 'child task description', 'Low', 0, '2024-01-14 12:27:55', '2024-01-14 12:27:55');

-- --------------------------------------------------------

--
-- Table structure for table `parenttasks`
--

CREATE TABLE `parenttasks` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parenttasks`
--

INSERT INTO `parenttasks` (`id`, `userId`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'DUmmy parent task title', '2024-01-14 12:31:56', '2024-01-14 12:31:56');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'joren97x', 'joren', 'asdasd', '2024-01-14 11:12:43', '2024-01-14 11:12:43'),
(4, 'ren', 'renskie', 'asdasd', '2024-01-14 11:16:58', '2024-01-14 11:16:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `childtasks`
--
ALTER TABLE `childtasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parenttasks`
--
ALTER TABLE `parenttasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `username_6` (`username`),
  ADD UNIQUE KEY `username_7` (`username`),
  ADD UNIQUE KEY `username_8` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `childtasks`
--
ALTER TABLE `childtasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `parenttasks`
--
ALTER TABLE `parenttasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
