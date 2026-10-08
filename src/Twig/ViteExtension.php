<?php

namespace App\Twig;

use Symfony\Component\Asset\Packages;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Twig\Attribute\AsTwigFunction;

/**
 * Inclut dans les templates Twig les fichiers compilés par Vite (npm run build).
 *
 * Vite donne aux fichiers des noms qui changent à chaque compilation (ex. main-BiOtDnKH.js).
 * Il écrit la correspondance dans public/build/.vite/manifest.json : on lit ce fichier
 * pour retrouver le bon JavaScript et le bon CSS de chaque page.
 */
class ViteExtension
{
    private ?array $manifest = null;

    public function __construct(
        private Packages $packages,
        #[Autowire('%kernel.project_dir%/public/build/.vite/manifest.json')]
        private string $manifestPath,
    ) {
    }

    /** Balises <link> des feuilles de style d'une entrée (ex. 'main') */
    #[AsTwigFunction('vite_entry_link_tags', isSafe: ['html'])]
    public function linkTags(string $entry): string
    {
        $html = '';
        foreach ($this->collectCss($this->entryKey($entry)) as $file) {
            $html .= sprintf('<link rel="stylesheet" href="%s">', $this->url($file));
        }

        return $html;
    }

    /** Balise <script> du JavaScript d'une entrée (ex. 'main') */
    #[AsTwigFunction('vite_entry_script_tags', isSafe: ['html'])]
    public function scriptTags(string $entry): string
    {
        $chunk = $this->manifest()[$this->entryKey($entry)];

        return sprintf('<script type="module" src="%s"></script>', $this->url($chunk['file']));
    }

    /** CSS de l'entrée et des morceaux qu'elle importe, dans le bon ordre */
    private function collectCss(string $key, array &$seen = []): array
    {
        if (isset($seen[$key])) {
            return [];
        }
        $seen[$key] = true;

        $chunk = $this->manifest()[$key];
        $css = [];
        foreach ($chunk['imports'] ?? [] as $import) {
            $css = [...$css, ...$this->collectCss($import, $seen)];
        }

        return array_values(array_unique([...$css, ...($chunk['css'] ?? [])]));
    }

    private function entryKey(string $entry): string
    {
        $key = "assets/$entry.jsx";
        if (!isset($this->manifest()[$key])) {
            throw new \RuntimeException(sprintf('L\'entrée Vite "%s" est introuvable : as-tu lancé "npm run build" ?', $entry));
        }

        return $key;
    }

    private function url(string $file): string
    {
        return $this->packages->getUrl('build/'.$file);
    }

    private function manifest(): array
    {
        if (null === $this->manifest) {
            if (!is_file($this->manifestPath)) {
                throw new \RuntimeException('Le front n\'est pas compilé : lance "npm install" puis "npm run build".');
            }
            $this->manifest = json_decode(file_get_contents($this->manifestPath), true, flags: \JSON_THROW_ON_ERROR);
        }

        return $this->manifest;
    }
}
