<?php
/**
 * Created by PhpStorm.
 * User: Álvaro
 * Date: 16/06/2018
 * Time: 20:28
 */

namespace AppBundle\Controller;

use BDBundle\Entity\Juguetes;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class JugueteController extends Controller
{
    public function newAction(Request $request) {
        $helpers = $this->get("app.helpers");
        $jwt_auth = $this->get("app.jwt_auth");

        $hash = $request->get("authorization", null);
        $authCheck = $helpers->authCheck($hash);

        $data = array();

        if($authCheck == true)
        {
            $identity = $helpers->authCheck($hash, true);

            $json = $request->get("json", null);

            if(isset($json)) {
                $params = json_decode($json);

                $creadoEn = new \DateTime('now');
                $actualizadoEn = new \DateTime('now');
                $imagen = null;

                $user_id = @$identity->sub;
                $fab_id = @$params->fab_id;
                $titulo = @$params->titulo;
                $descripcion = @$params->descripcion;
                $stock = @$params->stock;
                $precio = @$params->precio;
                $estado = @$params->estado;

                // WIP: Tengo que integrar lo de los fabricantes
                if(isset($user_id) && isset($fab_id) && isset($titulo) && isset($descripcion) && isset($stock) && isset($precio) && isset($estado))
                {
                    $em = $this->getDoctrine()->getManager();

                    $user = $em->getRepository("BDBundle:Usuarios")->findOneBy(array("id" => $user_id));
                    $fabricante = $em->getRepository("BDBundle:Fabricantes")->findOneBy(array("id" => $fab_id));

                    $juguete = new Juguetes();

                    $juguete->setUsuario($user);
                    $juguete->setFabricante($fabricante);

                    $juguete->setCreadoEn($creadoEn);
                    $juguete->setActualizadoEn($actualizadoEn);
                    $juguete->setTitulo($titulo);
                    $juguete->setDescripcion($descripcion);
                    $juguete->setImagen(isset($imagen) ? $imagen : "uploads/juguete/default.png");
                    $juguete->setPrecio($precio);
                    $juguete->setStock($stock);
                    $juguete->setEstado($estado);

                    $em->persist($juguete);
                    $em->flush();

                    $juguete = $em->getRepository("BDBundle:Juguetes")->findOneBy(array(
                        "usuario" => $user,
                        "fabricante" => $fabricante,
                        "estado" => $estado,
                        "creadoEn" => $creadoEn
                    ));

                    $data = array("status" => "success", "data" => $juguete);
                }
                else
                    $data = array("status" => "error", "msg" => "Debes establecer todos los parametros del juguete!");
            }

        }
        else
            $data = array("status" => "error", "code" => 400, "msg" => "Authorization not valid!!");

        return $helpers->json($data);
    }
}