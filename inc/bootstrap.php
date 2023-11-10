<?php

// windows 
// define("PROJECT_ROOT_PATH", "/xampp/htdocs");
  
// macbook 
define("PROJECT_ROOT_PATH", "/Applications/XAMPP/xamppfiles/htdocs");

// windows 
// require_once "/xampp/htdocs/inc/config.php";

// macbook 
require_once "/Applications/XAMPP/xamppfiles/htdocs/inc/config.php"; 

require_once PROJECT_ROOT_PATH . "/Controller/Api/BaseController.php";
require_once PROJECT_ROOT_PATH . "/Model/UserModel.php";
require_once PROJECT_ROOT_PATH . "/Model/RatingsModel.php"; 

?>