<?php

require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class RatingsModel extends Database

{

    public function createRating($username, $artist, $song, $rating){

        // Check if the user has already rated the same song
        $checkSql = "SELECT * FROM ratings WHERE username = ? AND artist = ? AND song = ?";
        $checkStmt = mysqli_prepare($this->connection, $checkSql);
        mysqli_stmt_bind_param($checkStmt, "sss", $username, $artist, $song);
        mysqli_stmt_execute($checkStmt);
        $result = mysqli_stmt_get_result($checkStmt);

        if (mysqli_num_rows($result) > 0) {
            // User has already rated the same song, you can handle this case accordingly
            return array("error" => "DuplicateEntry"); // For example, you can return FALSE to indicate the failure
        }

        // If the user has not rated the same song, proceed with inserting the new rating
        $insertSql = "INSERT INTO ratings (username, artist, song, rating) VALUES (?, ?, ?, ?)";
        $insertStmt = mysqli_prepare($this->connection, $insertSql);
        mysqli_stmt_bind_param($insertStmt, "sssi", $username, $artist, $song, $rating);

        try {
            return (mysqli_stmt_execute($insertStmt) === TRUE);
        } catch (Exception $e) {
            return FALSE;
        }
    }


    public function listRatings(){
        $sql = "SELECT * FROM ratings"; 
        return $this->select($sql); 
        
    }
  

    public function deleteRating($id, $username) {
        $strErrorDesc = '';
    
        $sql = "DELETE FROM ratings WHERE username = ? AND id = ?";
        
        // Initialize the prepared statement using the connection from $this
        $stmt = $this->connection->prepare($sql);
    
        if ($stmt) {
            // Bind parameters and execute the DELETE query
            $stmt->bind_param("si", $username, $id);
            $stmt->execute();
        } else {
            $strErrorDesc = 'Failed to prepare the DELETE statement.';
        }
    
        if (!empty($strErrorDesc)) {
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(["error" => $strErrorDesc]);
        } else {
            // Send a success response
            echo json_encode(["message" => "Entry deleted successfully"]);
        }
    }


    public function editRating($id, $username, $artist, $song, $rating) {
        // Query the database to check if the user attempting to edit is the original creator
        $query = "SELECT username FROM ratings WHERE id = ?";
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->bind_result($original_username);
        $stmt->fetch();
        $stmt->close();


        if ($original_username === $username) {
            // The user attempting the edit is the same as the original creator
            // Update the rating in the database with the new value
    
            $sql = "UPDATE ratings SET username = ?, artist = ?, song = ?, rating = ? WHERE id = ?";
                    $stmt = $this->connection->prepare($sql); 
                    mysqli_stmt_bind_param($stmt, "sssii", $username, $artist, $song, $rating, $id); 
                    mysqli_stmt_execute($stmt); 
    
        } else {
            // The user is not the original creator, so deny the edit
            $strErrorDesc = 'You are attempting to edit a rating that you did not post. Shame on you!';
            $strErrorHeader = 'HTTP/1.1 400 Bad Request';    
        }

        if (!empty($strErrorDesc)) {
            header($strErrorHeader);
            echo json_encode(["error" => $strErrorDesc]);
        }   
    }


}
    