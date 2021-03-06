<?php

namespace CodeProject\Http\Controllers;

use Illuminate\Http\Request;

use CodeProject\Http\Requests;

use GuzzleHttp\Client;


class confluenceController extends Controller
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
    public function __construct(){



    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $client = new Client();

        $response = $client->get('https://bahamut.atlassian.net/wiki/rest/api/content', [

            'auth' => ['admin', 'e398xp90'],
            'timeout'  => 3600
        ]);

//        if ($response->hasHeader('Content-Length')) {
//            echo  "It exists";
//        };
        $return = json_decode($response->getBody(), true);

        return $return['results'][0];
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
