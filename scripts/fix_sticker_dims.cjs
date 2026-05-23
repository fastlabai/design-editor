const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/providers/defaults/templates.data.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const dimensions = {
  '3d_stickers_light.png': { w: 540, h: 800 },
  '3d_stickers_thunder.png': { w: 561, h: 800 },
  '3d_stickers_rainbow.png': { w: 801, h: 565 },
  'polaroid_frame.png': { w: 657, h: 800 },
  'tape03.png': { w: 786, h: 800 },
  '3d_stickers_megaphone.png': { w: 800, h: 800 } // guessing roughly square
};

data.templates.forEach(t => {
  t.scene.layers.forEach(l => {
    if (l.type === 'StaticImage' && l.src) {
      for (const [filename, dims] of Object.entries(dimensions)) {
        if (l.src.includes(filename)) {
          const expectedW = dims.w;
          const expectedH = dims.h;
          // Calculate what scale factor is needed to maintain the visual size we had originally requested
          const scaleFixX = l.width / expectedW;
          const scaleFixY = l.height / expectedH;
          
          l.width = expectedW;
          l.height = expectedH;
          l.scaleX = (l.scaleX || 1) * scaleFixX;
          l.scaleY = (l.scaleY || 1) * scaleFixY;
        }
      }
    }
  });
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Sticker dimensions fixed!');
