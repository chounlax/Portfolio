<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PortfolioController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function home(): Response
    {
        return $this->render('portfolio/home.html.twig');
    }

    #[Route('/wheello', name: 'wheello')]
    public function wheello(): Response
    {
        return $this->render('portfolio/wheello.html.twig');
    }

    #[Route('/veille', name: 'veille')]
    public function veille(): Response
    {
        return $this->render('portfolio/veille.html.twig');
    }

    // Page de mes services d'auto-entrepreneur : aucun bouton du site n'y mène,
    // on y accède seulement en tapant son adresse.
    #[Route('/entreprise', name: 'entreprise')]
    public function entreprise(): Response
    {
        return $this->render('portfolio/entreprise.html.twig');
    }
}
