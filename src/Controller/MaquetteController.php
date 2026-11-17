<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Maquettes de sites montrées à mes prospects (freelance).
 * Chaque maquette est une page HTML toute prête dans public/maquettes/<nom>/index.html.
 * Cette route permet d'y accéder avec une adresse propre : /maquettes/<nom>
 */
class MaquetteController extends AbstractController
{
    #[Route('/maquettes/{nom}', name: 'maquette', requirements: ['nom' => '[a-z0-9-]+'])]
    public function afficher(string $nom): BinaryFileResponse
    {
        // chemin du fichier HTML de la maquette
        $fichier = $this->getParameter('kernel.project_dir').'/public/maquettes/'.$nom.'/index.html';

        if (!is_file($fichier)) {
            throw new NotFoundHttpException('Maquette introuvable');
        }

        // on renvoie le fichier tel quel, sans passer par Twig
        $reponse = new BinaryFileResponse($fichier);
        $reponse->headers->set('Content-Type', 'text/html; charset=UTF-8');
        // demande aux moteurs de recherche de ne pas l'indexer
        $reponse->headers->set('X-Robots-Tag', 'noindex, nofollow');

        return $reponse;
    }
}
