const fs = require('fs');
const path = require('path');

const files = [
  'data/fr/experiences.ts',
  'data/fr/formations.ts',
  'data/fr/projects.ts',
  'data/fr/me.tsx'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove keys
  const keysToRemove = [
    'createdAt', 'updatedAt', 'publishedAt', 'locale', 'provider', 
    'provider_metadata', 'hash', 'mime', 'sizeInBytes', 'size', 'ext', 'previewUrl'
  ];

  keysToRemove.forEach(key => {
    // Matches: key: "value", or key: { ... }, or key: 123.4,
    // Actually, provider_metadata: { ... }, is multiple lines.
    // Let's use regex for specific simple keys first.
  });

});
