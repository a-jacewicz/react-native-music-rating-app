<?php

// windows 
// require "/xampp/htdocs/inc/bootstrap.php";

// apple 
require "/Applications/XAMPP/htdocs/inc/bootstrap.php"; 

// CORS headers 
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Origin: http://localhost:3000');
     header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS');
     header('Access-Control-Allow-Credentials: true');
     header('Access-Control-Allow-Headers: Content-Type, Custom-Header');
     header('Referrer-Policy: no-referrer');
     exit;
   }
   
header('Access-Control-Allow-Origin:*'); 
//header('Access-Control-Allow-Origin: http://localhost:3000');

// Set allowed headers, or use * to allow any header.
header('Access-Control-Allow-Headers: Content-Type, Custom-Header');


// Allow specific HTTP methods (e.g., GET, POST, OPTIONS) from your frontend.
header('Access-Control-Allow-Methods: GET,POST, DELETE, OPTIONS');

// Allow credentials (e.g., cookies, HTTP authentication) to be sent with the request.
header('Access-Control-Allow-Credentials:true');

header('Referrer-Policy: no-referrer-when-downgrade'); 


$requestMethod = $_SERVER["REQUEST_METHOD"];

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$uri = explode( '/', $uri );

 
if ((isset($uri[2]) && ($uri[2] != 'user' && $uri[2] != 'rating')) || !isset($uri[3])) {
    header("HTTP/1.1 404 Not Found");

    exit();

}


if (isset($uri[2])) {
    if ($uri[2] == 'user') {
      // windows
      // require "/xampp/htdocs/Controller/Api/UserController.php";

      // mackbook 
      require "/Applications/XAMPP/htdocs/Controller/API/UserController.php";

    
      $objFeedController = new UserController();
      
      $strMethodName = $uri[3] . 'Action';
      
      $objFeedController->{$strMethodName}();
    } elseif ($uri[2] == 'rating') {

      // windows
      // require "/xampp/htdocs/Controller/Api/RatingsController.php"; 

      // macbook 
      require "/Applications/XAMPP/htdocs/Controller/API/RatingsController.php";

      
      $objFeedController = new RatingsController();
      
      $strMethodName = $uri[3] . 'Action';
      
      $objFeedController->{$strMethodName}();
    }
  }
  

?>