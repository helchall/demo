<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\ForgotPassType;
use App\Form\ResetPassType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

/**
 * @Route("/")
 */
class ForgetPasswordController extends AbstractController
{
    /**
     * @Route("/forget_pass", name="forgotten_password")
     */
    public function forgetPass(
        Request $request,
        UserRepository $userRepository,
        \Swift_Mailer $mailer,
        TokenGeneratorInterface $tokenGenerator
    ): Response {
        // Initializing form
        $form = $this->createForm(ForgotPassType::class);

        // Handling form
        $form->handleRequest($request);

        // check fom if validate
        if ($form->isSubmitted() && $form->isValid()) {
            // Get data from form
            $data = $form->getData();

            // Find user with this email
            $user = $userRepository->findOneByEmail($data['email']);

            // if user does'nt exists
            if ($user === null) {
                // Sending flash message
                $this->addFlash('danger', 'This mail does not exists!');

                // Redirect to login page
                return $this->redirectToRoute('app_login');
            }

            // Generate token
            $token = $tokenGenerator->generateToken();

            // Try to insert token into database
            try {
                $user->setResetToken($token);
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($user);
                $entityManager->flush();
            } catch (\Exception $e) {
                $this->addFlash('warning', $e->getMessage());
                return $this->redirectToRoute('app_login');
            }

            // Generate forgotten password link
            $url = $this->generateUrl('app_reset_password', array('token' => $token), UrlGeneratorInterface::ABSOLUTE_URL);

            // Preparing mail for sending
            // @todo create service to send mail .... to remove !
            $message = (new \Swift_Message('Mot de passe oubli??'))
                ->setFrom('votre@adresse.fr')
                ->setTo($user->getEmail())
                ->setBody(
                    "Bonjour,<br><br>Une demande de r??initialisation de mot de passe a ??t?? effectu??e pour le site demo. Veuillez cliquer sur le lien suivant : " . $url,
                    'text/html'
                );

            // Sending mail
            $mailer->send($message);

            // Create confirmation flash message
            $this->addFlash('message', 'E-mail de r??initialisation du mot de passe envoy?? !');

            // Redirect to loogin page
            return $this->redirectToRoute('app_login');
        }

        // Generate form
        return $this->render('security/forgotten_password.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/reset_pass/{token}", name="app_reset_password")
     */
    public function resetPassword(Request $request, string $token, UserPasswordEncoderInterface $passwordEncoder)
    {
        // Check user with token from email
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['resetToken' => $token]);

        // if user does'nt exists
        if (null === $user) {
            // Sending flash error
            $this->addFlash('danger', 'Invalid token!');
            return $this->redirectToRoute('app_login');
        }

        // Initializing form
        $form = $this->createForm(ResetPassType::class);

        // Handling form
        $form->handleRequest($request);

        // check fom if validate
        if ($form->isSubmitted() && $form->isValid()) {
            // Reset token
            $user->setResetToken(null);

            // Get data from form
            $data = $form->getData();

            // Encode the password (you could also do this via Doctrine listener)
            $password = $passwordEncoder->encodePassword($user, $data['plainPassword']);
            $user->setPassword($password);

            // Encode password
            //$user->setPassword($passwordEncoder->encodePassword($user, $request->request->get('password')));

            // Saving!
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            // Send flash msg
            $this->addFlash('message', 'Password updated');

            // Redirect to login page
            return $this->redirectToRoute('app_login');
        } else {
            return $this->render('security/reset_password.html.twig', [
               // 'token' => $token,
                'form'  => $form->createView()
            ]);
        }
    }
}
