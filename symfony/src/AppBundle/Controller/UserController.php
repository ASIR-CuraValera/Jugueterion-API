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
use Firebase\JWT\JWT;

class UserController extends Controller
{
    public function newAction(Request $request)
    {
        $helpers = $this->get("app.helpers");
        $jwt_auth = $this->get("app.jwt_auth");

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

            if(isset($email) && count($validateMail) == 0 && isset($password) && isset($nick) && isset($nombre) && isset($apellidos))
            {
                // Cifrar contraseña
                $pwd = JWT::encode($password, $jwt_auth->key, 'HS256'); //hash('hs256', $password);

                $user = new Usuarios();

                $user->setCreadoEn($creadoEn);
                $user->setNick($nick);
                $user->setNombre($nombre);
                $user->setApellidos($apellidos);
                $user->setPassword($pwd);
                $user->setEmail($email);
                $user->setRol($rol);
                $user->setAvatar($avatar);

                $em = $this->getDoctrine()->getManager();
                $issue_user = $em->getRepository("BDBundle:Usuarios")->findBy(array("email" => $email));

                if(count($issue_user) == 0) {
                    $em->persist($user);
                    $em->flush();

                    $data["status"] = 'success';
                    $data["code"] = 200;
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

    public function editAction(Request $request)
    {
        $helpers = $this->get("app.helpers");
        $jwt_auth = $this->get("app.jwt_auth");

        $hash = $request->get("authorization", null);
        $authCheck = $helpers->authCheck($hash);

        $data = array();

        if($authCheck)
        {
            $identity = $helpers->authCheck($hash, true);

            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository("BDBundle:Usuarios")->findOneBy(array(
                "id" => $identity->sub
            ));

            $json = $request->get("json", null);
            $params = json_decode($json);

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

                if(isset($email) && count($validateMail) == 0 && isset($nick) && isset($nombre) && isset($apellidos))
                {
                    // Cifrar contraseña
                    if(isset($password))
                    {
                        $pwd = JWT::encode($password, $jwt_auth->key, 'HS256'); //hash('hs256', $password);
                        $user->setPassword($pwd);
                    }

                    $user->setCreadoEn($creadoEn);
                    $user->setNick($nick);
                    $user->setNombre($nombre);
                    $user->setApellidos($apellidos);
                    $user->setEmail($email);
                    $user->setRol($rol);
                    $user->setAvatar($avatar);

                    $em = $this->getDoctrine()->getManager();
                    $issue_user = $em->getRepository("BDBundle:Usuarios")->findBy(array("email" => $email));

                    if(count($issue_user) == 0 || $identity->email == $email)
                    {
                        $em->persist($user);
                        $em->flush();

                        $data["status"] = 'success';
                        $data["code"] = 200;
                        $data["msg"] = 'New user created!!';
                    }
                    else
                        $data = array("status" => "error", "code" => 400, "msg" => "User not updated, duplicated!!");
                }
                else
                    $data = array("status" => "error", "code" => 400, "msg" => "User not updated (empty values): ".print_r($params, true));
            }
            else
                $data = array("status" => "error", "code" => 400, "msg" => "User not updated (JSON is null)");
        }
        else
            $data = array("status" => "error", "code" => 400, "msg" => "Authorization not valid!!");


        return $helpers->json($data);
    }

    public function uploadImageAction(Request $request)
    {
        $helpers = $this->get("app.helpers");

        $hash = $request->get("authorization", null);
        $authCheck = $helpers->authCheck($hash);

        if($authCheck) {
            $identity = $helpers->authCheck($hash, true);

            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository("BDBundle:Usuarios")->findOneBy(array("id" => $identity->sub));

            //Subir archivo
            $file = $request->files->get("image");

            if(!empty($file) && $file != null) {
                $ext = $file->guessExtension();
                if($ext == "jpeg" || $ext == "jpg" || $ext == "png" || $ext == "gif")
                {
                    $file_name = time().".".$ext;
                    $file->move("uploads/users", $file_name);

                    $user->setAvatar($file_name);
                    $em->persist($user);
                    $em->flush();

                    $data = array("status" => "success");
                }
                else {
                    $data = array("status" => "error", "msg" => "Extension de avatar no valida!");
                }
            }
            else
                {
                $data = array("status" => "error", "msg" => "Archivo de avatar no valido!");
            }
        }
        else {
            $data = array("status" => "error", "msg" => "Login no valido!");
        }

        return $helpers->json($data);
    }
}