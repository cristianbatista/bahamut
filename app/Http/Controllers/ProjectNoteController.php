<?php

namespace CodeProject\Http\Controllers;


use CodeProject\Repositories\ProjectNoteRepository;
use CodeProject\Services\ProjectNoteService;
use Illuminate\Http\Request;

use CodeProject\Http\Requests;


class ProjectNoteController extends Controller
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
    public function __construct(ProjectNoteRepository $repository, ProjectNoteService $service){

        $this->repository = $repository;
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return $this->repository->findWhere(['project_id'=>$id]);
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
    public function show($id, $noteId)
    {
        $result = $this->repository->findWhere(['project_id'=>$id, 'id'=> $noteId]);

        $result = [
                'data' => $result[0]
            ];

//        if(isset($result['data']) && count($result['data']) == 1){
//            $result = [
//                'data' => $result['data'][0]
//            ];
//        };

        return $result;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id, $noteId)
    {
        return $this->service->update($request->all(), $noteId);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $noteId)
    {
        return strval($this->repository->delete($noteId));
    }
}
