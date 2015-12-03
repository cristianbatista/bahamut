<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Entities\Client;
use CodeProject\Repositories\ClientRepository;
use CodeProject\Services\ClienteService;
use Illuminate\Http\Request;

use CodeProject\Http\Requests;


class ClientController extends Controller
{

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
    public function __construct(ClientRepository $repository, ClienteService $service){

        $this->repository = $repository;
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ClientRepository $repository)
    {
        return $repository->all();
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
        return $this->repository->delete($id);
    }
}
