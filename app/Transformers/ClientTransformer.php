<?php
/**
 * Created by PhpStorm.
 * User: victor
 * Date: 2/3/16
 * Time: 3:40 PM
 */

namespace CodeProject\Transformers;
use CodeProject\Entities\Client;
use League\Fractal\TransformerAbstract;


class ClientTransformer extends TransformerAbstract
{

    public function transform(Client $client){

        return [
            'id' => (int) $client->id,
          'name' => $client->name,
          'responsible' => $client->responsible,
          'email' => $client->email,
          'phone' => $client->phone,
          'address' => $client->address,
          'obs' => $client->obs
        ];

    }
}