<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Services\Neo4jService;
use Illuminate\Http\Request;

use CodeProject\Http\Requests;

use Neoxygen\NeoClient\ClientBuilder;


class neo4jController extends Controller
{

    private $connection;
    /**
     * @var ClientRepository
     */
    private $repository;
    /**
     * @var ClienteService
     */
    private $service;

    /**
     * @param ClientRepository $repository
     * @param ClienteService $service
     */
    public function __construct(Neo4jService $service){

        $this->service = $service;

        $this->connection = ClientBuilder::create()
            ->addConnection('default', 'http', 'ec2-54-94-173-25.sa-east-1.compute.amazonaws.com', 7474, true, 'neo4j', '123456')
            ->setAutoFormatResponse(true)
            ->build();

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $q = 'MATCH (a) WITH DISTINCT LABELS(a) AS temp, COUNT(a) AS tempCnt
UNWIND temp AS label
RETURN label, SUM(tempCnt) AS value';
        $this->connection->sendCypherQuery($q);

        $result = $this->connection->getRows();

        return $result;
    }

    public function search($str){
        $q = 'MATCH (a {type: "'+ $str +'"}) return a';

        $this->connection->sendCypherQuery($q);

        $result = $this->connection->getRows();

        return $result;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->service->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->repository->find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return $this->service->update($request->all(), $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return strval($this->repository->delete($id));
    }
}
