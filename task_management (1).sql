-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2024 at 01:43 AM
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
-- Table structure for table `child_tasks`
--

CREATE TABLE `child_tasks` (
  `id` int(11) NOT NULL,
  `parentTaskId` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `child_tasks`
--

INSERT INTO `child_tasks` (`id`, `parentTaskId`, `title`, `description`, `level`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Dummy child task', 'child task description', 'Low', 0, '2024-01-22 15:18:31', '2024-01-25 00:41:17'),
(3, 1, 'asdas', 'asdas', 'High', 1, '2024-01-25 02:23:36', '2024-01-25 02:24:00'),
(6, 1, 'ye', 'ye', 'Medium', 1, '2024-01-25 02:30:17', '2024-01-25 02:30:40'),
(8, 1, 'wqe', 'asd', 'High', 0, '2024-01-25 02:45:01', '2024-01-25 02:45:01'),
(11, 1, 'asd', 'asd', 'Medium', 0, '2024-01-25 02:47:21', '2024-01-25 02:47:21'),
(14, 4, 'dasd', 'as', 'Medium', 0, '2024-01-25 05:13:13', '2024-01-25 05:13:13'),
(15, 21, 'Breakfast', 'eat itlog, kan-on, and 1 liter of water', 'High', 1, '2024-01-26 00:13:39', '2024-01-26 00:39:05'),
(16, 21, 'facial skin care', 'sana all', 'High', 1, '2024-01-26 00:14:58', '2024-01-26 00:39:05'),
(17, 21, 'daily code', 'ambatocode', 'Medium', 0, '2024-01-26 00:15:16', '2024-01-26 00:15:34'),
(19, 22, 'facial skin care shit', 'just trying a new habit bruhh', 'High', 1, '2024-01-26 00:16:40', '2024-01-26 00:39:06'),
(20, 22, 'Brush teeth', 'cus its important!', 'High', 0, '2024-01-26 00:17:01', '2024-01-26 00:17:01');

-- --------------------------------------------------------

--
-- Table structure for table `parent_tasks`
--

CREATE TABLE `parent_tasks` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent_tasks`
--

INSERT INTO `parent_tasks` (`id`, `userId`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'DUmmy parent task title', '2024-01-21 19:54:05', '2024-01-21 19:54:05'),
(20, 1, 'asdas', '2024-01-25 05:54:41', '2024-01-25 05:54:41'),
(21, 3, 'Morning routine', '2024-01-26 00:13:12', '2024-01-26 00:13:12'),
(22, 3, 'Night time routine', '2024-01-26 00:16:03', '2024-01-26 00:16:03');

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `refreshToken` varchar(255) NOT NULL,
  `expirationDate` datetime NOT NULL,
  `issuedAt` datetime NOT NULL DEFAULT '2024-01-21 19:45:02',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`id`, `userId`, `refreshToken`, `expirationDate`, `issuedAt`, `createdAt`, `updatedAt`) VALUES
(9, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbCIsIm5hbWUiOiJEYW5pZWwgQ2Flc2FyIiwicGFzc3dvcmQiOiJhc2Rhc2QiLCJpYXQiOjE3MDYxNjI1MDN9.nquWzqFOx3bFyyMh7JiSJAAoaSbQ1M0qBLQWfvpCr3E', '2024-01-25 06:01:43', '2024-01-25 06:00:27', '2024-01-25 06:01:43', '2024-01-25 06:01:43'),
(11, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzZCIsIm5hbWUiOiJhc2QiLCJwYXNzd29yZCI6ImFzZGFzZCIsImlhdCI6MTcwNjIyNTI5OX0.wa1j-Z1C9CuCg1QR1NWCskE0bPuEeRuLDaxHkLG_oqA', '2024-01-25 23:28:19', '2024-01-25 23:22:18', '2024-01-25 23:28:19', '2024-01-25 23:28:19'),
(13, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbDk3eCIsIm5hbWUiOiJEYW5pZWwgQ2Flc2FyIiwicGFzc3dvcmQiOiJhc2Rhc2QiLCJpYXQiOjE3MDYyMjU0NzJ9.anSQCYSFCPb06oux6CyEG9R82YhNZTuZVl294FznSAc', '2024-01-25 23:31:12', '2024-01-25 23:22:18', '2024-01-25 23:31:12', '2024-01-25 23:31:12'),
(14, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmllbHgiLCJuYW1lIjoiRGFuaWVsIENhZXNhciIsInBhc3N3b3JkIjoiYXNkYXNkIiwiaWF0IjoxNzA2MjI1NTA2fQ._NDHtzNzJOjlCub6oR6ISUm2sxvTx2XzzECYwBtg0I4', '2024-01-25 23:31:46', '2024-01-25 23:31:32', '2024-01-25 23:31:46', '2024-01-25 23:31:46'),
(15, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkRhbmllbCBDYWVzYXIiLCJ1c2VybmFtZSI6ImRhbmllbDk3eCIsImlhdCI6MTcwNjIyNTU2NH0.gmblQU8xczVkJ7aqH_pNmatRbDngTPZMiGCQj3eBkmQ', '2024-01-25 23:32:44', '2024-01-25 23:31:32', '2024-01-25 23:32:44', '2024-01-25 23:32:44');

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
(1, 'joren97x', 'brent faiyaz', 'asdasd', '2024-01-21 19:49:19', '2024-01-21 19:49:19'),
(2, 'daniel', 'Daniel Caesar', 'asdasd', '2024-01-25 06:01:42', '2024-01-25 06:01:42'),
(3, 'wagamama', 'joren', 'asdasd', '2024-01-25 23:27:41', '2024-01-25 23:27:41'),
(4, 'asd', 'asd', 'asdasd', '2024-01-25 23:28:19', '2024-01-25 23:28:19'),
(5, 'daniel97x', 'Daniel Caesar', 'asdasd', '2024-01-25 23:31:12', '2024-01-25 23:31:12'),
(7, 'danielx', 'Daniel Caesar', 'asdasd', '2024-01-25 23:31:46', '2024-01-25 23:31:46'),
(8, 'wave', 'wave to earth', 'asdasd', '2024-01-26 00:25:08', '2024-01-26 00:25:08'),
(9, 'valentina', 'Daniel Caesar - Valentina', 'asdasd', '2024-01-26 00:26:52', '2024-01-26 00:26:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `child_tasks`
--
ALTER TABLE `child_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentTaskId` (`parentTaskId`);

--
-- Indexes for table `parent_tasks`
--
ALTER TABLE `parent_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `child_tasks`
--
ALTER TABLE `child_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `parent_tasks`
--
ALTER TABLE `parent_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `child_tasks`
--
ALTER TABLE `child_tasks`
  ADD CONSTRAINT `child_tasks_ibfk_1` FOREIGN KEY (`parentTaskId`) REFERENCES `parent_tasks` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `parent_tasks`
--
ALTER TABLE `parent_tasks`
  ADD CONSTRAINT `parent_tasks_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
