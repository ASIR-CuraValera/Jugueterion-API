<?php
/**
 * Created by PhpStorm.
 * User: Álvaro
 * Date: 17/06/2018
 * Time: 4:17
 */

namespace AppBundle\Controller;

use BDBundle\Entity\Comentarios;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class CommentController extends Controller
{
    public function newAction(Request $request)
    {
        $helpers = $this->get("app.helpers");

        $hash = $request->get("authorization", null);
        $authCheck = $helpers->authCheck($hash);

        $data = array();

        if($authCheck)
        {
            $identity = $helpers->authCheck($hash, true);

            $json = $request->get("json", null);

            if($json != null)
            {
                $params = json_decode($json);

                $creadoEn = new \DateTime('now');
                $user_id = @$identity->sub;
                $juguete_id = @$params->juguete_id;
                $texto = @$params->texto;

                if(isset($juguete_id) && isset($user_id) && isset($texto))
                {
                    $em = $this->getDoctrine()->getManager();

                    $user = $em->getRepository("BDBundle:Usuarios")->findOneBy(array("id" => $user_id));
                    $juguete = $em->getRepository("BDBundle:Juguetes")->findOneBy(array("id" => $juguete_id));

                    if(isset($user) && isset($juguete))
                    {
                        $comment = new Comentarios();

                        $comment->setCreadoEn($creadoEn);
                        $comment->setUsuario($user);
                        $comment->setJuguete($juguete);
                        $comment->setTexto($texto);

                        $em->persist($comment);
                        $em->flush();

                        $data = array("status" => "success", "msg" => "Comentario creado!");
                    }
                    else
                        $data = array("status" => "error", "code" => 400, "msg" => "Usuario o juguete no validos!");
                }
                else
                    $data = array("status" => "error", "code" => 400, "msg" => "Empty values in comment params!");
            }
            else
                $data = array("status" => "error", "code" => 400, "msg" => "Json no valido!");
        }
        else
            $data = array("status" => "error", "msg" => "Login no valido!");

        return $helpers->json($data);
    }

    // WIP: Por alguna razon deja borrar comentarios de todo el mundo
    public function deleteAction(Request $request, $id = null)
    {
        $helpers = $this->get("app.helpers");

        $hash = $request->get("authorization", null);
        $authCheck = $helpers->authCheck($hash);

        $data = array();

        if($authCheck)
        {
            $identity = $helpers->authCheck($hash, true);

            $em = $this->getDoctrine()->getManager();
            $comment = $em->getRepository("BDBundle:Comentarios")->findOneBy(array("id" => $id));

            $user_id = @$identity->sub;

            if(is_object($comment) && isset($user_id))
            {
                if(isset($user_id) && $user_id == $comment->getUsuario()->getId() ||
                $user_id == $comment->getJuguete()->getUsuario()->getId())
                {
                    $em->remove($comment);
                    $em->flush();

                    $data = array("status" => "success", "msg" => "Comentario borrado!");
                }
                else
                    $data = array("status" => "error", "msg" => "No estás autorizado a borrar este comentario!");
            }
            else
                $data = array("status" => "error", "msg" => "El comentario no existe!");
        }
        else
            $data = array("status" => "error", "msg" => "Login no valido!");

        return $helpers->json($data);
    }

    public function listAction(Request $request, $id = null)
    {
        $juguete_id = $id;
        $helpers = $this->get("app.helpers");
        $em = $this->getDoctrine()->getManager();

        $juguete = $em->getRepository("BDBundle:Juguetes")->findOneBy(array("id" => $juguete_id));
        $comentarios = $em->getRepository("BDBundle:Comentarios")->findBy(array("juguete" => $juguete), array('id' => 'DESC'));

        if(count($comentarios) >= 1)
        {
            $data = array("status" => "success", "data" => $comentarios);
        }
        else
            $data = array("status" => "error", "msg" => "No hay comentarios!");

        /*$dql = "SELECT j FROM BDBundle:Juguetes j ORDER BY j.id DESC";
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
        );*/

        return $helpers->json($data);
    }
}