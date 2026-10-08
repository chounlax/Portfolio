#!/bin/bash
# Met à jour les 3 pages WordPress à partir de wordpress/pages/*.html
# Usage : WP=<script qui appelle l'API WordPress> bash wordpress/publish.sh
set -e
cd "$(dirname "$0")/pages"
for spec in "32|accueil" "33|wheello" "34|veille"; do
  IFS='|' read id f <<< "$spec"
  python3 -I -c "import json,sys;print(json.dumps({'content':open(sys.argv[1],encoding='utf-8').read()}))" "$f.html" > /tmp/wp-page-$id.json
  $WP POST /wp/v2/pages/$id -H "Content-Type: application/json" --data-binary @/tmp/wp-page-$id.json \
    | python3 -I -c "import json,sys;d=json.load(sys.stdin);print(d.get('id'),d.get('link'),d.get('code') or 'à jour')"
  rm -f /tmp/wp-page-$id.json
done
