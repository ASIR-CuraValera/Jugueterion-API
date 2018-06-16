<?php

namespace AppBundle\Controller;

use AppBundle\Services\JwtAuth;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\Email;
use Firebase\JWT\JWT;

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
            $getHash = @$params->getHash;

            $emailConstraint = new Email();
            $emailConstraint->message = "Email no válido.";

            $validateMail = $this->get("validator")->validate($email, $emailConstraint);

            if(count($validateMail) == 0 && $password != null)
            {
                // JWT::encode($token, $key, 'HS256')
                $pwd = JWT::encode($password, $jwt_auth->key, 'HS256'); //hash('HS256', $password);
                $singup = $jwt_auth->singup($email, $pwd, $getHash);
                return new JsonResponse($singup);
            }
            else
            {
                return $helpers->json(array(
                    "status" => "error",
                    "data" => "Login not valid!"
                ));
            }
        }

        return null;
    }

    public function pruebasAction(Request $request)
    {
        $helpers = $this->get("app.helpers");
        //$jwt_auth = $this->get("app.jwt_auth");

        $hash = $request->get("authorization", null);
        $check = $helpers->authCheck($hash, true);

        var_dump($check);
        die;

        //$em = $this->getDoctrine()->getManager();
        //$users = $em->getRepository("BDBundle:Usuarios")->findAll();

        //return $helpers->json($users);
    }
}
