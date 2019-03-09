<?php

use function GuzzleHttp\json_decode;
require __DIR__ .'/../vendor/autoload.php';

class JSONParser
{
    public static function parseFile(string $file): array
    {
        $result = [
            'status'    => true,
            'data'      => [],
        ];
        try{
            $string = file_get_contents($file);
            $result['data'] = json_decode($string);
        }catch(Exception $e){
            $result['status'] = false;
            $result['data'] = $e;
        }finally{
            return $result;
        }
    }
}