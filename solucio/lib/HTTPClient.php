<?php
require __DIR__ .'/../vendor/autoload.php';
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;


class HTTPClient
{
    private $client, $url;
    function __construct($url, $token)
    {
        $this->url = $url;
        $this->client = new Client([
            // Base URI is used with relative requests
            // You can set any number of default request options.
            'timeout'       => 2.0,
            'base_uri'      => $this->url,
            'http_errors'   => false,
            'headers'       => [
                                'x-token'           => $token,   
                                'User-Agent'        => 'LaSalle-Agent-Testing',
                                'connect_timeout'   => 3.14,
                                'read_timeout'      => 3,
                                'debug'             => false
                            ],
        ]); 
    }
    /**
     * @param $uri
     * @param $params = []
     * @param $method = 'GET'
     */
    public function query(string $uri, array $params = [], string $method='GET')
    {
        $response = [
            'status'    => true,
            'data'      => null,
        ];
        try{
            $result = $this->client->request($method, $uri, [
                'json'   => $params
            ]);
            if ($result->getStatusCode() !== 200) {
                $response['status'] = false;
                $response['data'] = [
                        'code'  => 'Code error: '.$result->getStatusCode(),
                        'body'  => json_decode($result->getBody()),
                ];
            }else{
                $response['status'] = true;
                $data = json_decode($result->getBody());
                if (!$data)
                {
                    $response['data'] = [];
                }else{
                    $response['data'] = $data->data;
                }
            }
        }catch (\Exception $e){
            $response['status'] = false;
            $response['data'] =  $e;
        }
        return $response;
    }
}