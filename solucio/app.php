<<!DOCTYPE html>
<html>
<head>
<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
</head>
<body>
    
</body>
</html>

<?php
/*function __autoload($class_name){
    require_once $class_name.'.php';
}
*/
require(__DIR__.'/lib/HTTPClient.php');
require(__DIR__.'/lib/JSONParser.php');

####################################################
####################################################
###########  EXEMPLE client HTTP ###################
####################################################
####################################################

# Primer instanciar la classe, amb la base URL on hi ha la nostre api
$base_url   = 'http://127.0.0.1:3000';
$token      = 'C0UsWlYxXrMx81TKN2Eq';
$client     = new HTTPClient($base_url, $token);
# Si necessitem enviar paramatres a l'API, primer crearem un array amb els values
$params = [
    'nom' => $alumne['nom'],
];

## Mitjançant el client instanciat anteriorment, podem realitzar crides a l'API amb varis metodes
## i també enviar parametres.
# $client->query(string $uri, array $params = [], string $method='GET')
# Aquesta petició sempre ens retornarà un array amb dos camps:
## status =  true / false 
## data = retorn de l'API
$result = $client->query('/api/v1/alumnes');
$result = $client->query('/api/v1/alumnes/:id');
$result = $client->query('/api/v1/alumne', $params, 'POST');
$result = $client->query('/api/v1/alumne/:id', $params, 'PUT');
$result = $client->query('/api/v1/alumne/:id', [], 'DELETE');

$result = $client->query('/api/v1/assignatures');
$result = $client->query('/api/v1/assignatura/:id');
$result = $client->query('/api/v1/assignatura', $params, 'POST');
$result = $client->query('/api/v1/assignatura/:id', $params, 'PUT');
$result = $client->query('/api/v1/assignatura/:id', [], 'DELETE');

$result = $client->query('/api/v1/nota', $params, 'POST');
$result = $client->query('/api/v1/vincular', $params, 'POST');

####################################################
####################################################
###########  EXEMPLE parser JSON ###################
####################################################
####################################################
$result = JSONParser::parseFile(__DIR__.'/route/alumnes.json');
$result = JSONParser::parseFile(__DIR__.'/route/assignatures.json');
# $result contindrà dos camps
## status =  true / false 
## data = array amb els valors del json o el codi d'error