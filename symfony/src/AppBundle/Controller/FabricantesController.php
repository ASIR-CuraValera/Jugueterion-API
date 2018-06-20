<?php
/**
 * Created by PhpStorm.
 * User: Álvaro
 * Date: 20/06/2018
 * Time: 3:49
 */

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class FabricantesController extends Controller
{
    public function getAction()
    {
        $helpers = $this->get("app.helpers");
        $em = $this->getDoctrine()->getManager();
        $fabricantes = $em->getRepository("BDBundle:Fabricantes")->findAll();
        return $helpers->json(array("data" => $fabricantes));
    }
}