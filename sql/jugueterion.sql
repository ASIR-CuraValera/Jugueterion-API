-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2018 a las 10:27:43
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jugueterion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `juguete_id` int(11) NOT NULL,
  `texto` text NOT NULL,
  `creado_en` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `usuario_id`, `juguete_id`, `texto`, `creado_en`) VALUES
(3, 3, 1, 'Hola mundo!', '2018-06-17'),
(4, 3, 1, 'Hola mundo 2!', '2018-06-17'),
(6, 6, 1, 'ddfdfgf', '2018-06-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fabricantes`
--

CREATE TABLE `fabricantes` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `pais` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `fabricantes`
--

INSERT INTO `fabricantes` (`id`, `nombre`, `pais`) VALUES
(1, 'ToySaras', 'Mexico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juguetes`
--

CREATE TABLE `juguetes` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fabricante_id` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `descripcion` text NOT NULL,
  `estado` text NOT NULL,
  `imagen` text NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `stock` int(11) NOT NULL,
  `creado_en` date NOT NULL,
  `actualizado_en` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `juguetes`
--

INSERT INTO `juguetes` (`id`, `usuario_id`, `fabricante_id`, `titulo`, `descripcion`, `estado`, `imagen`, `precio`, `stock`, `creado_en`, `actualizado_en`) VALUES
(1, 3, 1, 'Titulo 1', 'Hola me llamo ralph', 'Nuevo', '1529177930.jpeg', '5', 1, '2018-06-16', '2018-06-16'),
(2, 3, 1, 'Titulo', 'Hola me llamo ralph', 'Nuevo', 'uploads/juguete/default.png', '5', 1, '2018-06-16', '2018-06-16'),
(3, 6, 1, 'fddffd', 'fdfdfd', 'nuevo', 'uploads/juguete/default.png', '0', 0, '2018-06-20', '2018-06-20'),
(4, 6, 1, 'gfgfgfgf', 'gfgfgf', 'nuevo', 'uploads/juguete/default.png', '0', 0, '2018-06-20', '2018-06-20'),
(5, 6, 1, 'fgfgfgf', 'gfgfgfgf', 'nuevo', 'uploads/juguete/default.png', '0', 0, '2018-06-20', '2018-06-20'),
(6, 6, 1, 'gfgfgfgf', 'gfgfgf', 'nuevo', 'uploads/juguete/default.png', '0', 0, '2018-06-20', '2018-06-20'),
(7, 6, 1, 'jkkjkjkj12', 'fgffgfggf', 'nuevo', 'uploads/juguete/default.png', '0', 0, '2018-06-21', '2018-06-21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `rol` int(11) NOT NULL,
  `nick` text NOT NULL,
  `nombre` text NOT NULL,
  `apellidos` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `avatar` text NOT NULL,
  `creado_en` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `rol`, `nick`, `nombre`, `apellidos`, `email`, `password`, `avatar`, `creado_en`) VALUES
(1, 1, 'usuario', 'Nombre', 'Apellido', 'hola@gmail.com', '1234', 'jaja.com', '2018-01-24'),
(2, 0, 'agapitordrgz', 'Agapaito', 'Rodriguez', 'agapito@gmail.com', 'prueba', 'imgs/avatar.png', '2018-06-06'),
(3, 1, 'agapitordrgz', 'Agapaito', 'Rodriguez', 'hola1@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMzQi.9OrOPvK7rt61XJ-rl6u_xKYEchCHCbbOacGu1ZMhCl8', '1529173285.jpeg', '2018-06-16'),
(4, 1, 'Usuario1', 'Usuario', 'usuario', 'usuario@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5JblZ6ZFdGeWFXOGkuUml5Wk9DX0V5M2Y2RUZrT2Zhd1J2bk5lT2FDNWNjUW95TUpjRjRIazJGSSI.tWcEL8arIf2KD4acMBVUSaBwtzOQvW_MT7XjbUwnlc8', 'imgs/avatar.png', '2018-06-17'),
(5, 1, 'usuario55', 'Álvaro', 'García', 'elektrostudios.web@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InVzdWFyaW8i.RiyZOC_Ey3f6EFkOfawRvnNeOaC5ccQoyMJcF4Hk2FI', 'imgs/avatar.png', '2018-06-17'),
(6, 1, 'Usuario97', 'usuario', 'usuarioo', 'usuario98@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InVzdWFyaW85OCI.D0lKZW9cps_xzCnKM5ZXfdflCrnR-VTkPLQz-pzfUlY', '1529334943.png', '2018-06-18');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `juguete_id` (`juguete_id`);

--
-- Indices de la tabla `fabricantes`
--
ALTER TABLE `fabricantes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `juguetes`
--
ALTER TABLE `juguetes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fabricante_id` (`fabricante_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `fabricantes`
--
ALTER TABLE `fabricantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `juguetes`
--
ALTER TABLE `juguetes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`juguete_id`) REFERENCES `juguetes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `juguetes`
--
ALTER TABLE `juguetes`
  ADD CONSTRAINT `juguetes_ibfk_1` FOREIGN KEY (`fabricante_id`) REFERENCES `fabricantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `juguetes_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
