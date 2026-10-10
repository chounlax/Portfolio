<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Attribute\Option;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\HttpKernelInterface;

/**
 * Exporte le portfolio en fichiers HTML statiques (dossier dist/) pour GitHub Pages,
 * qui ne sait pas exécuter PHP : Symfony génère chaque page une fois, on enregistre le résultat.
 *
 * Exemple : php bin/console app:export-static --base=/Portfolio
 */
#[AsCommand(name: 'app:export-static', description: 'Exporte le site en HTML statique dans dist/')]
class ExportStaticCommand
{
    // adresse de la page => fichier généré
    private const PAGES = [
        '/' => 'index.html',
        '/wheello' => 'wheello/index.html',
        '/veille' => 'veille/index.html',
        '/entreprise' => 'entreprise/index.html',
        '/en/entreprise' => 'en/entreprise/index.html',
    ];

    public function __construct(
        private HttpKernelInterface $httpKernel,
        #[Autowire('%kernel.project_dir%')]
        private string $projectDir,
    ) {
    }

    public function __invoke(
        SymfonyStyle $io,
        #[Option('Sous-dossier où le site sera publié (ex. /Portfolio pour GitHub Pages)')]
        string $base = '',
    ): int {
        $base = rtrim($base, '/');
        $dist = $this->projectDir.'/dist';
        $fs = new Filesystem();

        // 1. Copie des fichiers de public/ (images, CV, CSS/JS compilés par Vite)
        $fs->remove($dist);
        $fs->mirror($this->projectDir.'/public', $dist);
        $fs->remove(["$dist/index.php", "$dist/build/.vite"]);

        // 2. Génération de chaque page par Symfony, comme si un visiteur la demandait
        foreach (self::PAGES as $path => $file) {
            $request = Request::create($base.$path, server: [
                'SCRIPT_NAME' => $base.'/index.php',
                'SCRIPT_FILENAME' => $this->projectDir.'/public/index.php',
            ]);
            $response = $this->httpKernel->handle($request);

            if (200 !== $response->getStatusCode()) {
                $io->error(sprintf('La page %s a répondu %d.', $path, $response->getStatusCode()));

                return 1;
            }

            $fs->dumpFile("$dist/$file", $response->getContent());
            $io->writeln("  $base$path → dist/$file");
        }

        $io->success('Site exporté dans dist/');

        return 0;
    }
}
