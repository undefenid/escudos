const fs   = require('fs');
const path = require('path');

// Vars de GitHub Actions
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo  = process.env.GITHUB_REPOSITORY.split('/')[1];
// Base URL de tu GitHub Pages
const baseUrl = `https://${owner}.github.io/${repo}/images/`;

const imgDir = path.join(__dirname, '..', 'images');
const out    = [];

fs.readdirSync(imgDir).forEach(file => {
  // Filtra solo imágenes
  if (!file.match(/\.(png|jpe?g|svg)$/i)) return;

  const name = path.parse(file).name;       // e.g. "club-atletico-river-plate-argentina"
  const parts = name.split('-').filter(Boolean);
  const country = parts[parts.length - 1]; // "argentina"
  const type = parts.length === 1 
    ? 'national' 
    : 'club';

  out.push({
    slug:    name,
    url:     baseUrl + encodeURIComponent(file),
    country,
    type
  });
});

// Escribe mapping.json en la raíz
fs.writeFileSync(
  path.join(__dirname, '..', 'mapping.json'),
  JSON.stringify(out, null, 2),
  'utf8'
);
