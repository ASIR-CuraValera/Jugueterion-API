<?php
/**
 * Created by PhpStorm.
 * User: Álvaro
 * Date: 06/06/2018
 * Time: 15:17
 */

namespace AppBundle\Controller;

use BDBundle\Entity\Usuarios;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\Email;

class UserController extends Controller
{
    public function newAction(Request $request) {
        $helpers = $this->get("app.helpers");

        $json = $request->get("json", null);
        $params = json_decode($json);

        $data = array();

        if($json != null)
        {
            $creadoEn = new \DateTime("now");
            $avatar = "imgs/avatar.png"; // WIP: No puede ser nulo tampoco
            $rol = 1; // WIP: Hacer tabla para roles, 0 = user, 1 = admin

            $email = @$params->email;
            $nick = @$params->nickname;
            $nombre = preg_match('/^\p{L}*$/', @$params->nombre) ? @$params->nombre : null; // WIP: Usamos estos regex básicamente porque ctype_alpha no acepta acentos
            $apellidos = preg_match('/^\p{L}*$/', @$params->apellidos) ? @$params->apellidos : null;
            $password = @$params->password;

            $emailConstraint = new Email();
            $emailConstraint->message = "Email no válido.";

            $validateMail = $this->get("validator")->validate($email, $emailConstraint);

            if(isset($email) && count($validateMail) == 0 && isset($password) && isset($nick) && isset($nombre) && isset($apellidos)) {
                $user = new Usuarios();

                $user->setCreadoEn($creadoEn);
                $user->setNick($nick);
                $user->setNombre($nombre);
                $user->setApellidos($apellidos);
                $user->setPassword($password);
                $user->setEmail($email);
                $user->setRol($rol);
                $user->setAvatar($avatar);

                $em = $this->getDoctrine()->getManager();
                $issue_user = $em->getRepository("BDBundle:Usuarios")->findBy(array("email" => $email));

                if(count($issue_user) == 0) {
                    $em->persist($user);
                    $em->flush();

                    $data["status"] = 'success';
                    $data["msg"] = 'New user created!!';
                }
                else
                    $data = array("status" => "error", "code" => 200, "msg" => "User not created (el correo ya existe en la bbdd)");
            }
            else
                $data = array("status" => "error", "code" => 200, "msg" => "User not created (empty values): ".print_r($params, true));
        }
        else
            $data = array("status" => "error", "code" => 200, "msg" => "User not created (JSON is null)");

        return $helpers->json($data);
    }
}