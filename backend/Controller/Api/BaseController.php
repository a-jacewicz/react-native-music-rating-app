<?php

class BaseController

{

    /**

* __call magic method.

*/

    public function __call($name, $arguments)

    {

        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));

    }

    /**

* Get URI elements.

*

* @return array

*/

    protected function getUriSegments()

    {

        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        $uri = explode( '/', $uri );

        return $uri;

    }

    /**

* Get querystring params.

*

* @return array

*/

    protected function getQueryStringParams()

    {

        return parse_str($_SERVER['QUERY_STRING'], $query);

    }

    /**

* Send API output.

*

* @param mixed $data

* @param string $httpHeader

*/

    protected function sendOutput($data, $httpHeaders=array())

    {


      //  header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Custom-Header');
        header('Referrer-Policy: no-referrer-when-downgrade');   
        
        if (is_array($httpHeaders) && count($httpHeaders)) {

            foreach ($httpHeaders as $httpHeader) {

                header($httpHeader);

            }

        }


        echo $data;

        exit;

    }

}
?>