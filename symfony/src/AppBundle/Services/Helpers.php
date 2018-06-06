<?php
/**
 * Created by PhpStorm.
 * User: Álvaro
 * Date: 26/05/2018
 * Time: 19:59
 */

namespace AppBundle\Services;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Serializer;

class Helpers
{
    public $jwt_auth;

    public function __construct($jwt_auth)
    {
        $this->jwt_auth = $jwt_auth;
    }

    public function authCheck($hash, $getIdentity = false) {
        $jwt_auth = $this->jwt_auth;

        $auth = false;
        if($hash != null)
        {
            $auth = $jwt_auth->checkToken($hash, $getIdentity);
            //$auth = $value === true || is_object($value);
        }

        return $auth;
    }

    public function json($data)
    {
        $normalizers = array(new GetSetMethodNormalizer());
        $encoders = array("json" => new JsonEncoder());

        $serializer = new Serializer($normalizers, $encoders);
        $json = $serializer->serialize($data, 'json');

        $response = new Response();
        $response->setContent($json);
        $response->headers->set("Content-Type", "application/json");

        return $response;
    }
}