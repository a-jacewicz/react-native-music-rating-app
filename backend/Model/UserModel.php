<?php

require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class UserModel extends Database

{


public function usernameID($username) {
   return $this->select("SELECT username, password FROM users WHERE username = ?", ['s', $username]);
    }

    public function listUser()
    {
        return $this->select("SELECT username FROM users");

    }


    public function registerUser($username, $hashp){

        $sql = "INSERT INTO users (username, password) VALUES (?, ?)"; 
        $stmt = mysqli_prepare($this->connection, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $username, $hashp);
        try {
            return (mysqli_stmt_execute($stmt) === TRUE) ;
        }
        catch (Exception $e) {
            return FALSE;
        }
    }


public function loginUser($username, $password){
    $sql = "SELECT * FROM users WHERE username = ?"; 
    $stmt = $this->connection->prepare($sql); 
    mysqli_stmt_bind_param($stmt, "s", $username); 
    mysqli_stmt_execute($stmt); 
    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_array($result, MYSQLI_ASSOC); 
        // checks if password matches 
        if (password_verify($password, $user["password"])) {
                echo "$username"; 
        }        else {
            $strErrorDesc = 'Your password or username is not correct';
            $strErrorHeader = 'HTTP/1.1 400 Bad Request';   
        }
                
}
}