<?php
/**
 * Created by PhpStorm.
 * User: Álvaro
 * Date: 26/05/2018
 * Time: 20:15
 */

namespace AppBundle\Services;

use Firebase\JWT\JWT;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Serializer\Exception\UnexpectedValueException;

class JwtAuth
{
    private $manager;
    private $key = "clave-secreta";

    public function __construct($manager) {
        $this->manager = $manager;
    }

    // WIP: GetHash lo cambiaré por un json que se lo pasaré por petición
    public function singup($email, $password, $getHash = null) {
        $key = $this->key;

        $user = $this->manager->getRepository("BDBundle:Usuarios")->findOneby(
            array("email" => $email, "password" => $password)
        );

        if(is_object($user))
        {
            $token = array(
                "sub" => $user->getId(),
                "email" => $user->getEmail(),
                "iat" => time(),
                "exp" => time() + 7 * 24 * 3600);

            if($getHash != null)
                return JWT::encode($token, $key, 'HS256');
            else
                return JWT::decode($getHash, $key, array('HS256'));

            //return array("status" => "success", "data" => "OK");
        }
        else
            return array("status" => "error", "data" => "NOT OK!");
    }

    public function checkToken($jwt, $getIdentity = false) {
        $key = $this->key;
        //$auth = false;

        try {
            $decoded = JWT::decode($jwt, $key, array('HS256'));
        }
        catch(Exception $e) {//(UnexpectedValueException $e)
            //$auth = false;
            die($e);
        }

        $auth = isset($decoded->sub);

        if($getIdentity)
            return $decoded;
        else
            return $auth;
    }
}