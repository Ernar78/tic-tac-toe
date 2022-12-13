<?php 
	session_start();
	include "class/game.php";
	$Game = new Game();
	$Game->run();