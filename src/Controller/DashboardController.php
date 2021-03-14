<?php

namespace App\Controller;

use App\Repository\CarteRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/dashboard")
 */
class DashboardController extends AbstractController
{
    /**
     * @Route("/", name="dashboard_index", methods={"GET"})
     */
    public function index(
        UserRepository $userRepository,
        CarteRepository $carteRepository
    ): Response
    {
        // Get users

        return $this->render('dashboard/index.html.twig', [
            'users_count' => count($userRepository->findAll()),
            'cards_count' => count($carteRepository->findAll()),
        ]);
    }
}
