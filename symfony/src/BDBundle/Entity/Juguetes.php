<?php

namespace BDBundle\Entity;

/**
 * Juguetes
 */
class Juguetes
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $titulo;

    /**
     * @var string
     */
    private $descripcion;

    /**
     * @var string
     */
    private $estado;

    /**
     * @var string
     */
    private $imagen;

    /**
     * @var string
     */
    private $precio;

    /**
     * @var integer
     */
    private $stock;

    /**
     * @var \DateTime
     */
    private $creadoEn;

    /**
     * @var \DateTime
     */
    private $actualizadoEn;

    /**
     * @var \BDBundle\Entity\Fabricantes
     */
    private $fabricante;

    /**
     * @var \BDBundle\Entity\Usuarios
     */
    private $usuario;


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
     * Set titulo
     *
     * @param string $titulo
     *
     * @return Juguetes
     */
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;

        return $this;
    }

    /**
     * Get titulo
     *
     * @return string
     */
    public function getTitulo()
    {
        return $this->titulo;
    }

    /**
     * Set descripcion
     *
     * @param string $descripcion
     *
     * @return Juguetes
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * Get descripcion
     *
     * @return string
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set estado
     *
     * @param string $estado
     *
     * @return Juguetes
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * Get estado
     *
     * @return string
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * Set imagen
     *
     * @param string $imagen
     *
     * @return Juguetes
     */
    public function setImagen($imagen)
    {
        $this->imagen = $imagen;

        return $this;
    }

    /**
     * Get imagen
     *
     * @return string
     */
    public function getImagen()
    {
        return $this->imagen;
    }

    /**
     * Set precio
     *
     * @param string $precio
     *
     * @return Juguetes
     */
    public function setPrecio($precio)
    {
        $this->precio = $precio;

        return $this;
    }

    /**
     * Get precio
     *
     * @return string
     */
    public function getPrecio()
    {
        return $this->precio;
    }

    /**
     * Set stock
     *
     * @param integer $stock
     *
     * @return Juguetes
     */
    public function setStock($stock)
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * Get stock
     *
     * @return integer
     */
    public function getStock()
    {
        return $this->stock;
    }

    /**
     * Set creadoEn
     *
     * @param \DateTime $creadoEn
     *
     * @return Juguetes
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
     * Set actualizadoEn
     *
     * @param \DateTime $actualizadoEn
     *
     * @return Juguetes
     */
    public function setActualizadoEn($actualizadoEn)
    {
        $this->actualizadoEn = $actualizadoEn;

        return $this;
    }

    /**
     * Get actualizadoEn
     *
     * @return \DateTime
     */
    public function getActualizadoEn()
    {
        return $this->actualizadoEn;
    }

    /**
     * Set fabricante
     *
     * @param \BDBundle\Entity\Fabricantes $fabricante
     *
     * @return Juguetes
     */
    public function setFabricante(\BDBundle\Entity\Fabricantes $fabricante = null)
    {
        $this->fabricante = $fabricante;

        return $this;
    }

    /**
     * Get fabricante
     *
     * @return \BDBundle\Entity\Fabricantes
     */
    public function getFabricante()
    {
        return $this->fabricante;
    }

    /**
     * Set usuario
     *
     * @param \BDBundle\Entity\Usuarios $usuario
     *
     * @return Juguetes
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
}
