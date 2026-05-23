const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'providers', 'defaults', 'templates.data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const newSignage = [
  {
    id: 'sg-013',
    name: 'Luxury Jewelry',
    categoryId: 'signage',
    tags: ['luxury', 'jewelry', 'boutique', 'fashion'],
    canvasBg: '#020617',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-sg-013',
      frame: { width: 1080, height: 1920 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1515562141207-7a8efd38cd33?w=1080&h=1920&fit=crop&q=80', left: 0, top: 0, width: 1080, height: 1920, scaleX: 1, scaleY: 1, angle: 0, opacity: 0.6, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 60, top: 200, width: 960, height: 300, fill: '#FDE047', fontFamily: 'Lato', fontSize: 180, lineHeight: 1.0, textAlign: 'center', text: 'ELEGANCE' },
        { id: 'l3', name: 'StaticText', type: 'StaticText', left: 60, top: 1600, width: 960, height: 60, fill: '#FEF08A', fontFamily: 'Lato', fontSize: 40, lineHeight: 1.2, textAlign: 'center', text: 'THE NEW COLLECTION' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'sg-014',
    name: 'Concert Event',
    categoryId: 'signage',
    tags: ['music', 'concert', 'event', 'nightlife'],
    canvasBg: '#4C1D95',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-sg-014',
      frame: { width: 1080, height: 1920 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=1200&fit=crop&q=80', left: -100, top: -100, width: 1280, height: 1280, scaleX: 1, scaleY: 1, angle: 15, opacity: 1, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 60, top: 1100, width: 960, height: 400, fill: '#22D3EE', fontFamily: 'Lato', fontSize: 260, lineHeight: 0.9, textAlign: 'left', text: 'LIVE\nMUSIC' },
        { id: 'l3', name: 'StaticText', type: 'StaticText', left: 60, top: 1640, width: 960, height: 80, fill: '#F8FAFC', fontFamily: 'Lato', fontSize: 60, lineHeight: 1.2, textAlign: 'left', text: 'FRIDAY 9PM' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'sg-015',
    name: 'Organic Market',
    categoryId: 'signage',
    tags: ['organic', 'food', 'market', 'grocery'],
    canvasBg: '#14532D',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-sg-015',
      frame: { width: 1080, height: 1920 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1080&h=1920&fit=crop&q=80', left: 0, top: 0, width: 1080, height: 1920, scaleX: 1, scaleY: 1, angle: 0, opacity: 0.8, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 60, top: 1500, width: 960, height: 200, fill: '#BBF7D0', fontFamily: 'Lato', fontSize: 160, lineHeight: 0.95, textAlign: 'center', text: 'FARM\nFRESH' }
      ],
      metadata: { animated: false }
    }
  }
];

const newTvAds = [
  {
    id: 'tv-004',
    name: 'Auto SUV',
    categoryId: 'tv-ads',
    tags: ['auto', 'car', 'suv', 'vehicle'],
    canvasBg: '#1C1917',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-004',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&h=1080&fit=crop&q=80', left: 0, top: 0, width: 1920, height: 1080, scaleX: 1, scaleY: 1, angle: 0, opacity: 0.7, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 100, top: 100, width: 1720, height: 260, fill: '#FFFFFF', fontFamily: 'Lato', fontSize: 240, lineHeight: 1.0, textAlign: 'left', text: 'CONQUER EVERY ROAD' },
        { id: 'l3', name: 'StaticText', type: 'StaticText', left: 100, top: 880, width: 1720, height: 60, fill: '#D6D3D1', fontFamily: 'Lato', fontSize: 40, lineHeight: 1.2, textAlign: 'left', text: 'THE ALL NEW 2026 SUV' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-005',
    name: 'Streaming Series',
    categoryId: 'tv-ads',
    tags: ['movie', 'series', 'streaming', 'entertainment'],
    canvasBg: '#09090B',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-005',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop&q=80', left: 0, top: 0, width: 1920, height: 1080, scaleX: 1, scaleY: 1, angle: 0, opacity: 0.5, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 0, top: 400, width: 1920, height: 280, fill: '#EF4444', fontFamily: 'Lato', fontSize: 280, lineHeight: 1.0, textAlign: 'center', text: 'PREMIERES NOW' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-006',
    name: 'Iced Coffee',
    categoryId: 'tv-ads',
    tags: ['coffee', 'cafe', 'drink', 'morning'],
    canvasBg: '#FCA5A5',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-006',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&h=1200&fit=crop&q=80', left: -100, top: -100, width: 1200, height: 1200, scaleX: 1, scaleY: 1, angle: -5, opacity: 1, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 1100, top: 300, width: 700, height: 400, fill: '#7F1D1D', fontFamily: 'Lato', fontSize: 200, lineHeight: 0.9, textAlign: 'right', text: 'MORNING\nFUEL' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-007',
    name: 'Gaming Console',
    categoryId: 'tv-ads',
    tags: ['gaming', 'console', 'tech', 'entertainment'],
    canvasBg: '#4C1D95',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-007',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1920&h=1080&fit=crop&q=80', left: 0, top: 0, width: 1920, height: 1080, scaleX: 1, scaleY: 1, angle: 0, opacity: 0.6, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 100, top: 400, width: 1000, height: 300, fill: '#2DD4BF', fontFamily: 'Lato', fontSize: 280, lineHeight: 1.0, textAlign: 'left', text: 'PLAY HARD' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-008',
    name: 'Winter Apparel',
    categoryId: 'tv-ads',
    tags: ['apparel', 'fashion', 'winter', 'clothes'],
    canvasBg: '#E0F2FE',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-008',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1200&fit=crop&q=80', left: 700, top: -100, width: 1400, height: 1400, scaleX: 1, scaleY: 1, angle: 8, opacity: 1, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 100, top: 300, width: 800, height: 400, fill: '#0369A1', fontFamily: 'Lato', fontSize: 240, lineHeight: 0.9, textAlign: 'left', text: 'WINTER\nIS HERE' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-009',
    name: 'Luxury Home',
    categoryId: 'tv-ads',
    tags: ['real estate', 'home', 'property', 'luxury'],
    canvasBg: '#FFFFFF',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-009',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop&q=80', left: 0, top: 0, width: 1920, height: 1080, scaleX: 1, scaleY: 1, angle: 0, opacity: 1, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 100, top: 800, width: 800, height: 160, fill: '#1F2937', fontFamily: 'Lato', fontSize: 140, lineHeight: 1.0, textAlign: 'left', text: '$2,400,000' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-010',
    name: 'Supermarket Deal',
    categoryId: 'tv-ads',
    tags: ['supermarket', 'groceries', 'deal', 'food'],
    canvasBg: '#FACC15',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-010',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=1080&fit=crop&q=80', left: 0, top: 0, width: 1920, height: 1080, scaleX: 1, scaleY: 1, angle: 0, opacity: 0.3, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 100, top: 200, width: 1720, height: 400, fill: '#B91C1C', fontFamily: 'Lato', fontSize: 320, lineHeight: 1.0, textAlign: 'center', text: 'BIG WEEKEND SALE' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-011',
    name: 'Laptop Tech',
    categoryId: 'tv-ads',
    tags: ['laptop', 'tech', 'computer', 'sale'],
    canvasBg: '#F3F4F6',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-011',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=1200&fit=crop&q=80', left: -200, top: 0, width: 1200, height: 1200, scaleX: 1, scaleY: 1, angle: -10, opacity: 1, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 1000, top: 400, width: 800, height: 300, fill: '#111827', fontFamily: 'Lato', fontSize: 240, lineHeight: 0.9, textAlign: 'right', text: 'WORK\nANYWHERE' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-012',
    name: 'Fragrance',
    categoryId: 'tv-ads',
    tags: ['perfume', 'fragrance', 'beauty'],
    canvasBg: '#FDF2F8',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-012',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1920&h=1080&fit=crop&q=80', left: 0, top: 0, width: 1920, height: 1080, scaleX: 1, scaleY: 1, angle: 0, opacity: 0.7, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 100, top: 400, width: 1720, height: 200, fill: '#831843', fontFamily: 'Lato', fontSize: 180, lineHeight: 1.0, textAlign: 'center', text: 'EAU DE PARFUM' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-013',
    name: 'Credit Card',
    categoryId: 'tv-ads',
    tags: ['bank', 'credit card', 'finance'],
    canvasBg: '#1E3A8A',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-013',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop&q=80', left: 0, top: 0, width: 1920, height: 1080, scaleX: 1, scaleY: 1, angle: 0, opacity: 0.4, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 100, top: 300, width: 1720, height: 400, fill: '#DBEAFE', fontFamily: 'Lato', fontSize: 260, lineHeight: 0.9, textAlign: 'center', text: '5% CASHBACK\nEVERYWHERE' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-014',
    name: 'Album Release',
    categoryId: 'tv-ads',
    tags: ['music', 'album', 'release', 'artist'],
    canvasBg: '#000000',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-014',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=1200&fit=crop&q=80', left: 800, top: -100, width: 1300, height: 1300, scaleX: 1, scaleY: 1, angle: 10, opacity: 1, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 100, top: 400, width: 800, height: 300, fill: '#FFFFFF', fontFamily: 'Lato', fontSize: 240, lineHeight: 0.9, textAlign: 'left', text: 'NEW\nALBUM' }
      ],
      metadata: { animated: false }
    }
  },
  {
    id: 'tv-015',
    name: 'Furniture Store',
    categoryId: 'tv-ads',
    tags: ['furniture', 'home', 'interior'],
    canvasBg: '#FEF3C7',
    workspaceBg: '#1a1a2e',
    scene: {
      id: 'tpl-tv-015',
      frame: { width: 1920, height: 1080 },
      layers: [
        { id: 'l1', name: 'StaticImage', type: 'StaticImage', src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop&q=80', left: 0, top: 0, width: 1920, height: 1080, scaleX: 1, scaleY: 1, angle: 0, opacity: 1, originX: 'left', originY: 'top', metadata: {} },
        { id: 'l2', name: 'StaticText', type: 'StaticText', left: 100, top: 100, width: 800, height: 300, fill: '#7C2D12', fontFamily: 'Lato', fontSize: 200, lineHeight: 0.9, textAlign: 'left', text: 'MODERN\nLIVING' }
      ],
      metadata: { animated: false }
    }
  }
];

data.templates = data.templates.concat(newSignage).concat(newTvAds);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Successfully added 15 new templates!');
