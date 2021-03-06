<?php
/**
 * Created by PhpStorm.
 * User: victor
 * Date: 2/3/16
 * Time: 3:49 PM
 */

namespace CodeProject\Presenters;

use CodeProject\Transformers\ProjectTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

class ProjectPresenter extends FractalPresenter
{
    public function getTransformer()
    {
        return new ProjectTransformer();
    }
}