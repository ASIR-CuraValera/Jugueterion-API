<?php

namespace BDBundle\Entity;

/**
 * Comentarios
 */
class Comentarios
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $texto;

    /**
     * @var \DateTime
     */
    private $creadoEn;

    /**
     * @var \BDBundle\Entity\Usuarios
     */
    private $usuario;

    /**
     * @var \BDBundle\Entity\Juguetes
     */
    private $juguete;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set texto
     *
     * @param string $texto
     *
     * @return Comentarios
     */
    public function setTexto($texto)
    {
        $this->texto = $texto;

        return $this;
    }

    /**
     * Get texto
     *
     * @return string
     */
    public function getTexto()
    {
        return $this->texto;
    }

    /**
     * Set creadoEn
     *
     * @param \DateTime $creadoEn
     *
     * @return Comentarios
     */
    public function setCreadoEn($creadoEn)
    {
        $this->creadoEn = $creadoEn;

        return $this;
    }

    /**
     * Get creadoEn
     *
     * @return \DateTime
     */
    public function getCreadoEn()
    {
        return $this->creadoEn;
    }

    /**
     * Set usuario
     *
     * @param \BDBundle\Entity\Usuarios $usuario
     *
     * @return Comentarios
     */
    public function setUsuario(\BDBundle\Entity\Usuarios $usuario = null)
    {
        $this->usuario = $usuario;

        return $this;
    }

    /**
     * Get usuario
     *
     * @return \BDBundle\Entity\Usuarios
     */
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * Set juguete
     *
     * @param \BDBundle\Entity\Juguetes $juguete
     *
     * @return Comentarios
     */
    public function setJuguete(\BDBundle\Entity\Juguetes $juguete = null)
    {
        $this->juguete = $juguete;

        return $this;
    }

    /**
     * Get juguete
     *
     * @return \BDBundle\Entity\Juguetes
     */
    public function getJuguete()
    {
        return $this->juguete;
    }
}
