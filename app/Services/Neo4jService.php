<?php
/**
 * Created by PhpStorm.
 * User: vitor
 * Date: 02/12/15
 * Time: 23:41
 */

namespace CodeProject\Services;

use Neoxygen\NeoClient\ClientBuilder;

class Neo4jService
{
    private $connection;

    public function __construct(){
        $this->connection = ClientBuilder::create()
            ->addConnection('default', 'http', 'ec2-54-94-173-25.sa-east-1.compute.amazonaws.com', 7474, true, 'neo4j', '123456')
            ->setAutoFormatResponse(true)
            ->build();
    }

    public function create(array $data){

        $params = ['type' => $data['type'] ];

        try{
            $q = "CREATE (a:Area {name: {type} }) return a";

            $response = $this->connection->sendCypherQuery($q, $params);

            $result = $response->getResult();

            \Log::info(print_r($result, true));

            return $result;

        } catch (ValidatorException $e) {
            return [
              'error' => true,
              'message' => $e->getMessageBag()
            ];
        }

    }

}