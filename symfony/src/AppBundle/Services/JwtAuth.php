<?php
/**
 * Created by PhpStorm.
 * User: Álvaro
 * Date: 26/05/2018
 * Time: 20:15
 */

namespace AppBundle\Services;

use Firebase\JWT\JWT;

class JwtAuth
{
    private $manager;

    public function __construct($manager) {
        $this->manager = $manager;
    }

    public function singup($email, $password, $getHash = null) {
        $key = "clave-secreta";

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

            if($getHash == null)
                return JWT::encode($token, $key, 'HS256');
            else
                return JWT::decode($getHash, $key, array('HS256'));

            //return array("status" => "success", "data" => "OK");
        }
        else
            return array("status" => "error", "data" => "NOT OK!");
    }
}