<?php
/**
 * Created by PhpStorm.
 * User: vitor
 * Date: 03/12/15
 * Time: 00:05
 */

namespace CodeProject\Validators;


use Prettus\Validator\LaravelValidator;

class ProjectValidator extends LaravelValidator
{

    protected $rules = [
      'owner_id' => 'required',
      'client_id' => 'required',
      'name' => 'required',
      'progress' => 'required',
      'status' => 'required',
      'due_date' => 'required',
    ];

}