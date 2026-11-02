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

    #[Route('/cyber-1', name: 'cyber1')]
    public function cyber1(): Response
    {
        return $this->render('portfolio/cyber1.html.twig');
    }

    #[Route('/cyber-2', name: 'cyber2')]
    public function cyber2(): Response
    {
        return $this->render('portfolio/cyber2.html.twig');
    }
}
