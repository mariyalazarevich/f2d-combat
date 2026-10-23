export interface Product {
  id: string;
  name: string;
  article: string;
  price: number;
  inStock: boolean;
  image?: string;
  category: string[];
}

export const popularProducts: Product[] = [
  {
    id: 'os-15cv-r',
    name: 'Двигатель O.S. 15CV-R',
    article: 'OS15CVR',
    price: 42500,
    inStock: true,
    category: ['engine'],
  },
  {
    id: 'bearing-6700',
    name: 'Подшипник 6700 (10x15x4)',
    article: '6700',
    price: 1200,
    inStock: true,
    category: ['bearing'],
  },
  {
    id: 'fuel-rdl-10',
    name: 'Топливо RDL 10%',
    article: 'RDL10',
    price: 850,
    inStock: true,
    category: ['fuel'],
  },
  {
    id: 'prop-6x3',
    name: 'Винт 6x3',
    article: '6x3',
    price: 450,
    inStock: true,
    category: ['chassis', 'others'],
  },
  {
    id: 'glow-os-n8',
    name: 'Свеча накаливания OS N8',
    article: 'OSN8',
    price: 320,
    inStock: true,
    category: ['others'],
  },
  {
    id: 'fuel-pump',
    name: 'Топливный насос',
    article: 'FPD-20',
    price: 2800,
    inStock: true,
    category: ['others', 'fuel'],
  },
  {
    id: 'muffler-15cv',
    name: 'Глушитель 15CV',
    article: 'OS-315',
    price: 4200,
    inStock: false,
    category: ['others'],
  },
  {
    id: 'needle-valve',
    name: 'Игла карбюратора',
    article: '72106100',
    price: 550,
    inStock: true,
    category: ['others'],
  },
];
