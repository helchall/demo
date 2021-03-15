<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use App\Security\LoginFormAuthenticator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;

/**
 * @Route("/register")
 */
class RegistrationController extends AbstractController
{
    /**
     * @Route("/", name="user_registration")
     */
    public function register(
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder,
        GuardAuthenticatorHandler $guardHandler,
        LoginFormAuthenticator $authenticator,
        \Swift_Mailer $mailer
    ){
        // 1) build the form
        $user = new User();
        $form = $this->createForm(UserType::class, $user, [
            'registration' => true
        ]);

        // 2) handle the submit (will only happen on POST)
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // 3) Encode the password (you could also do this via Doctrine listener)
            $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);

            // Generate activiation token
            $user->setActivationToken(md5(uniqid()));

            // 4) save the User!
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            // ... do any other work - like sending them an email, etc
            // maybe set a "flash" success message for the user

            // do anything else you need here, like send an email
            // @todo create a service for sending mail ... to remove !
            // On crée le message
            $message = (new \Swift_Message('Nouveau compte'))
            // On attribue l'expéditeur
            ->setFrom('votre@adresse.fr')
            // On attribue le destinataire
            ->setTo($user->getEmail())
            // On crée le texte avec la vue
            ->setBody(
                $this->renderView(
                    'emails/activation.html.twig', ['token' => $user->getActivationToken()]
                ),
                'text/html'
            )
            ;
            $mailer->send($message);

            // Connect user if success
            return $guardHandler->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $authenticator,
                'main' // firewall name in security.yaml
            );

            //return $this->redirectToRoute('app_login');
        }

        return $this->render(
            'registration/register.html.twig',
            array('form' => $form->createView())
        );
    }

    /**
     * @Route("/activation/{token}", name="activation")
     */
    public function activation($token, UserRepository $userRepository)
    {
        // Find if a user exists with this token in datavase
        $user = $userRepository->findOneBy(['activationToken' => $token]);

        // if any user exists
        if(!$user){
            // Send 404 error
            throw $this->createNotFoundException('This user does not exists');
        }

        // Delete token
        $user->setActivationToken(null);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        // Send flash message
        $this->addFlash('message', 'User activated with success');

        // Redirect to dashboard page
        return $this->redirectToRoute('dashboard');
    }
}
