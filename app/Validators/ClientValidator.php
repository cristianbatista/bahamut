<?php
/**
 * Created by PhpStorm.
 * User: vitor
 * Date: 03/12/15
 * Time: 00:05
 */

namespace CodeProject\Validators;


use Prettus\Validator\LaravelValidator;

class ClientValidator extends LaravelValidator
{

    protected $rules = [
      'name' => 'required|max:255',
      'responsible' => 'required|max:255',
      'email' => 'required|email',
      'phone' => 'required',
      'address' => 'required',
    ];

}