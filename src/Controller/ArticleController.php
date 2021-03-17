<?php

namespace App\Controller;

use App\Entity\Article;
use JMS\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ArticleController extends AbstractController
{
    /**
     * @Route("/articles", name="article_create", methods={"POST"})
     */
    public function createAction(Request $request, SerializerInterface $serializerInterface)
    {
        $data = $request->getContent();
        $article = $serializerInterface->deserialize($data, 'App\Entity\Article', 'json');

        $em = $this->getDoctrine()->getManager();
        $em->persist($article);
        $em->flush();

        return new Response('', Response::HTTP_CREATED);
    }

    /**
     * @Route("/articles/{id}", name="article_show")
     */
    public function showAction(Article $article, SerializerInterface $serializerInterface)
    {
        $data = $serializerInterface->serialize($article, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
