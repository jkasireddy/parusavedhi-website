
#!/usr/bin/env bash

set -euo pipefail

echo "Building Parusavedhi corporate website..."

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$ROOT_DIR"

rm -rf dist

mkdir -p dist

# Explicitly copy approved public HTML pages.

for page in \
    index.html \
    about.html \
    founder.html \
    leadership.html \
    mission-vision-values.html \
    products.html \
    corn-roaster.html \
    corn-boiler.html \
    services.html \
    social-impact.html \
    partnerships.html \
    contact.html \
    privacy.html \
    404.html
do

    if [ ! -s "$page" ]; then
        echo "Missing or empty page: $page"
        exit 1
    fi

    cp "$page" dist/

done

# Copy public assets.

cp -R assets dist/
cp -R css dist/
cp -R js dist/

# Copy public configuration.

cp robots.txt dist/
cp sitemap.xml dist/
cp _headers dist/
cp _redirects dist/

# Limit Pages Functions to the API route.

cat > dist/_routes.json <<'EOF'
{
    "version": 1,
    "include": ["/api/enquiry"],
    "exclude": []
}
EOF

# Remove unnecessary development files from public output.

find dist -name ".DS_Store" -delete
find dist -name ".gitkeep" -delete

echo "Build successful."
echo "Deployment output: dist/"
