<?php

class RatingsController extends BaseController

{

    public function createAction(){
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
    
        $postData = file_get_contents('php://input'); 
        $data = json_decode($postData, true); 
    
        if (strtoupper($requestMethod) == 'POST' && isset($data['artist']) && isset($data['song']) && isset($data['rating'])) {
            try {
                $username = $data["username"];
                $artist = $data["artist"]; 
                $song = $data["song"];
                $rating = $data["rating"];

                $ratingModel = new RatingsModel(); 
                $result = $ratingModel->createRating($username, $artist, $song, $rating); 
    
                if (isset($result['error']) && $result['error'] === 'DuplicateEntry') {
                    // Handle duplicate entry error
                    $responseData = array(
                        "allgood" => false, 
                        "error" => "DuplicateEntry"
                    );
                } else {
                    $responseData = array(
                        "allgood" => true, 
                        "message" => "Song has been rated!"
                    );
                }
    
                $response = json_encode($responseData); 
            }
            catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Input something else!';
            $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
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


    public function viewAction(){
        $strErrorDesc = '';

        $requestMethod = $_SERVER["REQUEST_METHOD"];

        $arrQueryStringParams = $this->getQueryStringParams();
 

        if (strtoupper($requestMethod) == 'GET') {
            try {
                $ratingsModel = new RatingsModel();
                $arrRatings = $ratingsModel->listRatings();

                $responseData = json_encode($arrRatings);

            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

            }

        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // send output

        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );

        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );

        }

    }

  
    public function deleteAction() {
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    if (strtoupper($requestMethod) == 'DELETE') {
        $ratingsModel = new RatingsModel();

        // Retrieve data for rating deletion from the request body
        $postData = json_decode(file_get_contents('php://input'), true);

        $id = $postData['id']; // Assuming you'll use the 'id' to identify the rating to delete
        $username = $postData['username']; 

        if (empty($id) || !is_numeric($id)) {
            $strErrorDesc = 'Issue where the post you are attempting to delete does not have an id';
            $strErrorHeader = 'HTTP/1.1 400 Bad Request';     
            } else {
            try {
            $deleted = $ratingsModel->deleteRating($id, $username);
        }
     catch (Exception $e) {
            $strErrorDesc = $e->getMessage();
        }

    }
    }
    else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    if (!empty($strErrorDesc)) {
        header($strErrorHeader);
        echo json_encode(["error" => $strErrorDesc]);
    }
    }


    public function editAction() {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            $ratingsModel = new RatingsModel();
    
             // Retrieve data for rating deletion from the request body
             $postData = json_decode(file_get_contents('php://input'), true);
    
             $id = $postData['id']; 
             $username = $postData['username']; 
             $artist = $postData['artist'];
             $song = $postData['song']; 
             $rating = $postData['rating'];  
            
             if (empty($artist) || empty($song) || empty($rating)) {
                $strErrorDesc = 'You need to enter a username, song and rating';
                $strErrorHeader = 'HTTP/1.1 400 Bad Request';                       
                } elseif (is_numeric($rating) == false || ((int)$rating != $rating)) {
                $strErrorDesc = 'You need to enter an integer for the rating';
                $strErrorHeader = 'HTTP/1.1 400 Bad Request';   
            } elseif  ($rating < 1 OR $rating > 5) {
                $strErrorDesc = 'You need to enter a rating that is between 1 and 5';
                $strErrorHeader = 'HTTP/1.1 400 Bad Request';       
            } else {
                try {
                $ratingsModel->editRating($id, $username, $artist, $song, $rating); 
            }
         catch (Exception $e) {
            $strErrorDesc = $e->getMessage();
        }
    }
    }
     else {
        $strErrorDesc = 'Method not supported';
        $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
    }
    if (!empty($strErrorDesc)) {
        // header($strErrorHeader);
        echo json_encode(["error" => $strErrorDesc]);
    }
    }



}