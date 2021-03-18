<?php

namespace App\Controller;

use App\Entity\Article;
use JMS\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ArticleTestController extends AbstractController
{
    /**
     * @Route("/articles_test", name="article_test_create", methods={"POST"})
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
     * @Route("/articles_test/{id}", name="article_test_show")
     */
    public function showAction(Article $article, SerializerInterface $serializerInterface)
    {
        $data = $serializerInterface->serialize($article, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
