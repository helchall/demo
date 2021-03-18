<?php

namespace App\Controller;

use App\Entity\Author;
use JMS\Serializer\SerializerInterface;
use App\Repository\AuthorRepository;
use App\Repository\ArticleRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthorController extends AbstractController
{
    /**
     * @Route("/authors/{id}", name="author_show")
     */
    public function showAction(ArticleRepository $articleRepository)
    {
        $article = $articleRepository->findOneById(1);

        $author = new Author();
        $author->setFullname('Sarah Khalil');
        $author->setBiography('Ma super biographie.');
        $author->getArticles()->add($article);


        $data =  $this->get('serializer')->serialize($author, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
