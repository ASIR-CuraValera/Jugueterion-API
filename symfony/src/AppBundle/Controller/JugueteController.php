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
    public function newAction(Request $request)
    {
        $helpers = $this->get("app.helpers");

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

    public function editAction(Request $request, $id = null)
    {
        $juguete_id = $id;
        $helpers = $this->get("app.helpers");

        $hash = $request->get("authorization", null);
        $authCheck = $helpers->authCheck($hash);

        $data = array();

        if($authCheck == true)
        {
            $identity = $helpers->authCheck($hash, true);

            $json = $request->get("json", null);

            if(isset($json))
            {
                $params = json_decode($json);

                $creadoEn = new \DateTime('now');
                $actualizadoEn = new \DateTime('now');
                $imagen = null;

                $titulo = @$params->titulo;
                $descripcion = @$params->descripcion;
                $stock = @$params->stock;
                $precio = @$params->precio;
                $estado = @$params->estado;

                // WIP: Tengo que integrar lo de los fabricantes
                if(isset($titulo) && isset($descripcion) && isset($stock) && isset($precio) && isset($estado))
                {
                    $em = $this->getDoctrine()->getManager();

                    $juguete = $em->getRepository("BDBundle:Juguetes")->findOneBy(array("id" => $juguete_id));

                    if(isset($juguete))
                    { // WIP: Si eres admin esta restriccion se va
                        if(isset($identity->sub) && $identity->sub == $juguete->getUsuario()->getId())
                        {
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

                            $data = array("status" => "success", "msg" => "Video editado correctamente!");
                        }
                        else
                            $data = array("status" => "error", "msg" => "No eres el propietario de este juguete!");
                    }
                    else
                        $data = array("status" => "error", "msg" => "Juguete no encontrado!");
                }
                else
                    $data = array("status" => "error", "msg" => "Debes establecer todos los parametros del juguete!");
            }
            else
                $data = array("status" => "error", "msg" => "JSON vacio!");
        }
        else
            $data = array("status" => "error", "code" => 400, "msg" => "Authorization not valid!!");

        return $helpers->json($data);
    }

    public function uploadAction(Request $request, $id = null)
    {
        $juguete_id = $id;
        $helpers = $this->get("app.helpers");

        $hash = $request->get("authorization", null);
        $authCheck = $helpers->authCheck($hash);

        $data = array();

        if($authCheck == true)
        {
            $identity = $helpers->authCheck($hash, true);

            $em = $this->getDoctrine()->getManager();

            $juguete = $em->getRepository("BDBundle:Juguetes")->findOneBy(array("id" => $juguete_id));

            if(isset($juguete))
            { // WIP: Si eres admin esta restriccion se va
                if(isset($identity->sub) && $identity->sub == $juguete->getUsuario()->getId())
                {
                    $juguete_imagen = $request->files->get('imagen', null);

                    if(isset($juguete_imagen))
                    {
                        $ext = $juguete_imagen->guessExtension();
                        if($ext == "jpeg" || $ext == "jpg" || $ext == "png" || $ext == "gif")
                        {
                            $file_name = time().".".$ext;
                            $juguete_imagen->move("uploads/juguete", $file_name);

                            $juguete->setImagen($file_name);
                            $em->persist($juguete);
                            $em->flush();

                            $data = array("status" => "success", "msg" => "Imagen de juguete subida correctamente!");
                        }
                        else {
                            $data = array("status" => "error", "msg" => "Extension de avatar no valida!");
                        }
                    }
                }
                else
                    $data = array("status" => "error", "msg" => "No eres el propietario de este juguete!");
            }
            else
                $data = array("status" => "error", "msg" => "Juguete no encontrado!");
        }
        else
            $data = array("status" => "error", "code" => 400, "msg" => "Authorization not valid!!");

        return $helpers->json($data);
    }

    public function listAction(Request $request)
    {
        $helpers = $this->get("app.helpers");

        $em = $this->getDoctrine()->getManager();

        $dql = "SELECT j FROM BDBundle:Juguetes j ORDER BY j.id DESC";
        $query = $em->createQuery($dql);

        $page = $request->query->getInt("page", 1);
        $paginator = $this->get("knp_paginator");
        $items_per_page = 6;

        $pagination = $paginator->paginate($query, $page, $items_per_page);
        $total_items_count = $pagination->getTotalItemCount();

        $data = array(
            "status" => "success",
            "total_items_count" => $total_items_count,
            "actual_page" => $page,
            "items_per_page" => $items_per_page,
            "total_pages" => ceil($total_items_count / $items_per_page),
            "data" => $pagination
        );

        return $helpers->json($data);
    }

    public function lastAction(Request $request)
    {
        $helpers = $this->get("app.helpers");

        $em = $this->getDoctrine()->getManager();

        $dql = "SELECT j FROM BDBundle:Juguetes j ORDER BY j.creadoEn DESC";
        $query = $em->createQuery($dql)->setMaxResults(5);
        $juguetes = $query->getResult();

        $data = array("status" => "success", "data" => $juguetes);

        return $helpers->json($data);
    }

    public function detailAction(Request $request, $id = null)
    {

    }
}