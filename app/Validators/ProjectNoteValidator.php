<?php
/**
 * Created by PhpStorm.
 * User: vitor
 * Date: 03/12/15
 * Time: 00:05
 */

namespace CodeProject\Validators;


use Prettus\Validator\LaravelValidator;

class ProjectNoteValidator extends LaravelValidator
{

    protected $rules = [
      'project_id' => 'required|integer',
      'title' => 'required',
      'note' => 'required'
    ];

}