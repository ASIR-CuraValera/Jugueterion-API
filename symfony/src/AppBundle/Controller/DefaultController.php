<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\Email;

class DefaultController extends Controller
{
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ]);
    }

    public function loginAction(Request $request)
    {
        $helpers = $this->get("app.helpers");
        $jwt_auth = $this->get("app.jwt_auth");

        $json = $request->get("json", null);

        if($json != null) {
            $params = json_decode($json);

            $email = @$params->email;
            $password = @$params->password;

            $emailConstraint = new Email();
            $emailConstraint->message = "Email no válido.";

            $validateMail = $this->get("validator")->validate($email, $emailConstraint);

            if(count($validateMail) == 0 && $password != null)
            {
                //die($password);
                $singup = $jwt_auth->singup($email, $password);
                return new JsonResponse($singup);
            }
            else
            {
                die("count: ".$json);
            }
        }

        return null;
    }

    public function pruebasAction(Request $request)
    {
        $helpers = $this->get("app.helpers");

        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository("BDBundle:Usuarios")->findAll();

        return $helpers->json($users);
    }
}
