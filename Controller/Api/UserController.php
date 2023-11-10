<?php

class UserController extends BaseController

{


// Allow user to register 
public function registerAction(){
  
  // get the request method eg (Get, Post, Put, Delete)
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $response = ''; // Initialize the response variable


$postData = file_get_contents('php://input'); 
$data = json_decode($postData, true); 


if (strtoupper($requestMethod) == 'POST' && isset($data['username']) && isset($data['password']) && isset($data['second'])) {
    try {
        // get all data and make it referenceable here 
    $username = $data["username"];
    $password = $data["password"] ; 
    $second = $data["second"];
    if ($password !== $second) {
        $strErrorDesc = 'The passwords you enter need to match!';
        throw new Exception('The passwords you enter need to match!');

    }else { 
        $userModel = new UserModel();
        $alreadyuser = $userModel->usernameID($username); 
        if(!empty($alreadyuser)){
            $strErrorDesc = 'That username is already taken';
            throw new Exception('That username is already taken!');
        }
        else {
            $hashp = password_hash($password, PASSWORD_DEFAULT); 
            $userModel = new UserModel(); 
            $userarray = $userModel->registerUser($username, $hashp); 

            $responseData = array(
                "allgood" => true,
                "message" => "You are registered!",
               ); 
               $response = json_encode($responseData); 

        }

    }
}
catch (Exception $e) {
$strErrorDesc = $e->getMessage().'Please fix this issue.';
$strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
header($strErrorHeader); // Set HTTP response status code to 500
}
}
else {
$strErrorDesc = 'All fields need input!';
$strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
header($strErrorHeader); // Set HTTP response status code to 500
}


if (!$strErrorDesc) {
    $this->sendOutput(
        $response,
        array('Content-Type: application/json', 'HTTP/1.1 200 OK')
    );
} else {
    $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
        array('Content-Type: application/json', $strErrorHeader)
    );
}
}


// Allow user to login  
public function loginAction(){


    $strErrorDesc = '';

$requestMethod = $_SERVER["REQUEST_METHOD"];

$postData = file_get_contents('php://input'); 
$data = json_decode($postData, true); 


if (strtoupper($requestMethod) == 'POST' && isset($data['username']) && isset($data['password']) ) {
    try {
        // get all data and make it referenceable here 
    $username = $data["username"];
    $password = $data["password"] ; 

    // if statement here checking if user is in database     
    $userModel = new UserModel();
    $alreadyuser = $userModel->usernameID($username); 
    // if they are, then send back message sayig they are logged in 
    if(!empty($alreadyuser)){
        // got the idea for using password verify here from chatgpt
        if(password_verify($password, $alreadyuser[0]["password"])){

        $responseData = array(
            "success" => true,
            "message" => "You are logged in!",
            "username" => $username
        );
        $response = json_encode($responseData); 
    }
    else {
        $strErrorDesc = 'Not the correct username password combo!';
        throw new Exception('Not the right username password combo!');
    }
}
    else { 
        $strErrorDesc = 'Not the correct username password combo!';
        throw new Exception('Not the right username password combo!');
    }
}
catch (Exception $e) {
    $strErrorDesc = $e->getMessage().'Try again.';
    $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
    header($strErrorHeader); // Set HTTP response status code to 500
}
}
else {
$strErrorDesc = 'You need to input a username and password! If you are doing so, something is wrong with the method.';
$strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
header($strErrorHeader); // Set HTTP response status code to 500
}

if (!$strErrorDesc) {
    $this->sendOutput(
        $response,
        array('Content-Type: application/json', 'HTTP/1.1 200 OK')
    );
} else {
    $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
        array('Content-Type: application/json', $strErrorHeader)
    );
}
}


// Allow user to logout  
public function logoutAction(){
    //   $strErrorDesc = '';
   
       $responseData = array(
        "success" => true, 
    ); 
    $response = json_encode($responseData);

    $this->sendOutput(
        $response,
        array('Content-Type: application/json', 'HTTP/1.1 200 OK')
    );
    }
} 