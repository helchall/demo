<?php

namespace App\Manager;

// You can use mailer and create a "Trait class".
// see : https://symfony.com/doc/4.4/mailer.html

class EmailManager
{
    /**
     * Object mailer
     *
     * @var \Swift_Mailer
     */
    private $swift_Mailer;

    /**
     * Constructor
     *
     * @param \Swift_Mailer $mailer
     */
    public function __construct(\Swift_Mailer $mailer)
    {
        $this->swift_Mailer = $mailer;
    }

    /**
     * Sending mail with params
     *
     * @param array $params
     */
    public function send(array $from, array $to, $body, $type, $attachmentPath = null)
    {
       // $this->validateParameter($params);

        $message = (new \Swift_Message('Demo symfony'))
            ->setFrom($this->params['from'])
            ->setTo($this->params['to']);
            //->setCc('cc@example.com')
            //->setBcc('bcc@example.com')
            //->setReplyTo('fabien@example.com')
            //->setPriority(Email::PRIORITY_HIGH)

        // Check if attachment
        if (!is_null($attachmentPath)) {
            $message->attach(\Swift_Attachment::fromPath($attachmentPath));
        }

        $message->setBody($body, $type);

        // Sending mail!
        $this->swift_Mailer->send($message);
    }
}
