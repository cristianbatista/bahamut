<?php
/**
 * Created by PhpStorm.
 * User: victor
 * Date: 2/3/16
 * Time: 3:40 PM
 */

namespace CodeProject\Transformers;
use CodeProject\Entities\User;
use League\Fractal\TransformerAbstract;


class ProjectMemberTransformer extends TransformerAbstract
{

    public function transform(User $member){

        return [
          'member_id' => $member->id,
            'name' => $member->name
        ];

    }

}