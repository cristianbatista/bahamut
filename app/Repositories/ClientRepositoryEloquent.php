<?php
/**
 * Created by PhpStorm.
 * User: vitor
 * Date: 01/12/15
 * Time: 00:03
 */

namespace CodeProject\Repositories;


use CodeProject\Entities\Client;
use Prettus\Repository\Eloquent\BaseRepository;

class ClientRepositoryEloquent extends BaseRepository implements ClientRepository
{

    Public function model()
    {
        return Client::class;
    }

}