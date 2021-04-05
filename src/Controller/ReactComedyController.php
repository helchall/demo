<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/react-comedy")
 */
class ReactComedyController extends AbstractController
{
    /**
     * @Route("/", name="react_comedy_index", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->render('reactcomdey/index.html.twig');
    }
}
