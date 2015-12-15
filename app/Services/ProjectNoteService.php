<?php
/**
 * Created by PhpStorm.
 * User: vitor
 * Date: 02/12/15
 * Time: 23:41
 */

namespace CodeProject\Services;


use CodeProject\Entities\ProjectNote;
use CodeProject\Repositories\ClientRepository;
use CodeProject\Repositories\ProjectNoteRepository;
use CodeProject\Repositories\ProjectRepository;
use CodeProject\Validators\ClientValidator;
use CodeProject\Validators\ProjectNoteValidator;
use CodeProject\Validators\ProjectValidator;
use Prettus\Validator\Exceptions\ValidatorException;


class ProjectNoteService
{
    /**
     * @var ProjectNoteRepository
     */
    protected $repository;
    /**
     * @var ProjectNoteValidator
     */
    protected $validator;

    public function __construct(ProjectNoteRepository $repository, ProjectNoteValidator $validator){
        $this->repository = $repository;
        $this->validator = $validator;
    }

    public function create(array $data){

        try{
            $this->validator->with($data)->passesOrFail();
            return $this->repository->create($data);
        } catch (ValidatorException $e) {
            return [
              'error' => true,
              'message' => $e->getMessageBag()
            ];
        }

    }

    public function update(array $data, $id){

        try{
            $this->validator->with($data)->passesOrFail();
            return $this->repository->update($data, $id);
        } catch (ValidatorException $e) {
            return [
                'error' => true,
                'message' => $e->getMessageBag()
            ];
        }


    }
}