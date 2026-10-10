<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Translation\TranslatorBagInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

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
    // Elle existe en deux langues : /entreprise (français) et /en/entreprise (anglais).
    #[Route(path: ['fr' => '/entreprise', 'en' => '/en/entreprise'], name: 'entreprise')]
    public function entreprise(Request $request, TranslatorInterface $translator): Response
    {
        // Tous les textes de la langue demandée (fichiers translations/entreprise.fr.yaml / .en.yaml).
        // Symfony les range « à plat » (ex. "hero.title") : on reconstruit l'arborescence du YAML
        // pour l'envoyer en JSON au React.
        \assert($translator instanceof TranslatorBagInterface);
        $texts = [];
        foreach ($translator->getCatalogue($request->getLocale())->all('entreprise') as $key => $text) {
            $level = &$texts;
            foreach (explode('.', $key) as $part) {
                $level = &$level[$part];
            }
            $level = $text;
            unset($level);
        }

        return $this->render('portfolio/entreprise.html.twig', ['texts' => $texts]);
    }
}
