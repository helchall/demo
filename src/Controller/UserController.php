<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/user")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/index/{reactIndex}", name="user_index", methods={"GET"}, defaults={"reactIndex": null})
     */
    public function index($reactIndex, UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();
        $list  = [];

        if ($reactIndex) {
            /** @User $user */
            foreach ($users as $user) {
                $list[] = $this->transform($user);
            }

            $data     = json_encode($list);
            $response = new Response($data);
            $response->headers->set('Content-Type', 'application/json');

            return $response;
        } else {
            return $this->render('user/index.html.twig', [
                'users' => $users,
            ]);
        }
    }

    /**
     * @Route("/new/{reactNew}", name="user_new", methods={"GET","POST"}, defaults={"reactNew": null})
     */
    public function new($reactNew, Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user          = new User();

        if ($reactNew) {
            $data = json_decode($request->getContent(), true);

            $user->setEmail($data['email']);
            $user->setUsername($data['username']);
            // Encode the password (you could also do this via Doctrine listener)
            $password = $passwordEncoder->encodePassword($user, $data['plainPassword']);
            $user->setPassword($password);

            // Save the User!
            $entityManager->persist($user);
            $entityManager->flush();

            $data     = json_encode($this->transform($user));
            $response = new Response($data);
            $response->headers->set('Content-Type', 'application/json');
            $response->setStatusCode(Response::HTTP_CREATED);

            return $response;
        } else {
            $form = $this->createForm(UserType::class, $user);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                // Encode the password (you could also do this via Doctrine listener)
                $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
                $user->setPassword($password);

                // Save the User!
                $entityManager->persist($user);
                $entityManager->flush();

                return $this->redirectToRoute('user_index');
            }

            return $this->render('user/new.html.twig', [
                'user' => $user,
                'form' => $form->createView(),
            ]);
        }
    }

    /**
     * @Route("/{id}", name="user_show", methods={"GET"})
     */
    public function show(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="user_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, User $user, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Encode the password (you could also do this via Doctrine listener)
            $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);

            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('user_index');
        }

        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="user_delete", methods={"DELETE"})
     */
    public function delete(Request $request, User $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('user_index');
    }

    private function transform(User $user)
    {
        return [
                'id'       => (int) $user->getId(),
                'email'    => (string) $user->getEmail(),
                'username' => $user->getUsername(),
                'roles'    => $user->getRoles()
        ];
    }
}
